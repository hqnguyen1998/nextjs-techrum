import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Button, Paper } from '@material-ui/core';
import { fetcher } from '../src/api-fetcher';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const getConfig = () => {
  let config = {
    readonly: false,
    theme: 'dark',
  };
  return config;
};

const TextEditor = ({ pid }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = React.useState('');

  const newConfig = React.useMemo(() => getConfig());

  const token = useSelector((state) => state.auth.token);

  const handleComment = async () => {
    const data = await fetcher(`${process.env.API_URI}/api/comment`, {
      method: 'POST',
      headers: {
        authorization: token,
      },
      body: JSON.stringify({
        pid: pid,
        content: content,
      }),
    });
    if (data.success) {
      setContent('');
      enqueueSnackbar('Bạn đã thêm 1 bình luận', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Lỗi! Không thể thêm bình luận', {
        variant: 'error',
      });
    }
  };

  return (
    <Box component={Paper} square mt={2} p={1}>
      <JoditEditor
        value={content}
        config={newConfig}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent.target.innerHTML)} // preferred to use only this option to update the content for performance reasons
      />
      <br />
      <Button onClick={handleComment} variant='contained' color='primary'>
        Bình luận
      </Button>
    </Box>
  );
};

export default TextEditor;
