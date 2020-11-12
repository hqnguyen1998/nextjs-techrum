import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { fetcher } from '../src/api-fetcher';
import React from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const NewPostPopup = ({ open, onClose }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector((state) => state.auth.token);
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState({});
  const [content, setContent] = React.useState('');

  let config = {
    readonly: false,
    theme: 'light',
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetcher(
        `${process.env.API_URI}/api/subcategory/${router.query.slug}`
      );

      setCategory(categories.data);
    };

    fetchCategories();
  }, []);

  const handleSubmitPost = async () => {
    const data = await fetcher(`${process.env.API_URI}/api/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
        category: category._id,
      }),
    });

    if (data.success) {
      setTitle('');
      setContent('');
    }

    enqueueSnackbar(data.msg, {
      variant: data.success ? 'success' : 'error',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Đăng tin/bài mới</DialogTitle>
      <DialogContent>
        <TextField
          label='Title'
          name='title'
          variant='outlined'
          margin='dense'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label='Category'
          value={category._id}
          variant='outlined'
          select
          margin='dense'
          disabled
          fullWidth
        >
          <MenuItem value={category._id}>{category.title}</MenuItem>
        </TextField>
        <JoditEditor
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent.target.innerHTML)} // preferred to use only this option to update the content for performance reasons
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitPost} variant='contained' color='primary'>
          Đăng tin/bài
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPostPopup;
