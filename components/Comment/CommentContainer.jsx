import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { fetcher } from '../../src/api-fetcher';

// Component
import TextEditor from '../TextEditor/TextEditor';

const useStyles = makeStyles((theme) => ({
  commentHeader: {
    fontWeight: 800,
    textTransform: 'capitalize',
    color: theme.palette.secondary.main,
  },
}));

const CommentContainer = ({ pid }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.auth);

  const [text, setText] = useState('');

  const handleChange = (values) => {
    setText(values);
  };

  const handleComment = async () => {
    const data = await fetcher(`${process.env.API_URI}/api/comment`, {
      method: 'POST',
      headers: {
        authorization: token,
      },
      body: JSON.stringify({
        pid: pid,
        content: text,
      }),
    });

    if (data.success) {
      setText('');
    }

    enqueueSnackbar(data.msg, {
      variant: data.success ? 'success' : 'error',
    });
  };

  return (
    <Box mt={2}>
      <Typography variant='h4' className={classes.commentHeader}>
        Bình Luận
      </Typography>
      <Divider light />
      <br />
      <TextEditor value={text} onChange={handleChange} />
      <br />
      <Button onClick={handleComment} variant='contained' color='secondary'>
        Bình luận
      </Button>
    </Box>
  );
};

export default CommentContainer;
