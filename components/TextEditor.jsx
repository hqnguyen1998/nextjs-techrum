import React from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Button, Paper } from '@material-ui/core';
import { fetcher } from '../src/api-fetcher';

import { addCommentInPost } from '../redux/actions/commentActions';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const TextEditor = ({ pid }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const editorRef = React.useRef(null);
  const [content, setContent] = React.useState('');

  const token = useSelector((state) => state.auth.token);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    theme: 'dark',
  };

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

    console.log(data);

    if (data.success) {
      setContent('');
      dispatch(addCommentInPost(data.data));
      enqueueSnackbar('Bạn đã thêm 1 bình luận', {
        variant: 'success',
      });
      return;
    }

    enqueueSnackbar('Lỗi! Không thể thêm bình luận', {
      variant: 'error',
    });
  };

  return (
    <Box component={Paper} square mt={2} p={1}>
      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
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
