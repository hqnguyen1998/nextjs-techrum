import React from 'react';
import router from 'next/router';
import fetch from 'isomorphic-unfetch';
import {
  Box,
  Button,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
// Config
import {
  API_SUBCATEGORY_ROUTE,
  API_POST_ROUTE,
} from '../../../config/config.json';
// Components
import TextEditor from '../../../components/TextEditor/TextEditor';
import Layout from '../../../layouts/Layout';

const useStyles = makeStyles((theme) => ({
  input: {
    height: '100px',
    fontSize: 50,
  },
}));

const NewPost = ({ token, category }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { isAuth } = useSelector((state) => state.auth);
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    !isAuth && router.push('/');
  }, [isAuth]);

  const handleChangeText = (content) => {
    setText(content);
  };

  const handleSubmitPost = async () => {
    const postData = {
      title: title,
      content: text,
      category: category,
    };

    const res = await fetch(`${process.env.API_URI}${API_POST_ROUTE}`, {
      method: 'POST',
      headers: {
        authorization: token,
      },
      body: JSON.stringify(postData),
    });

    const { success, msg } = await res.json();

    if (success) {
      setTitle('');
      setText('');
    }

    enqueueSnackbar(msg, {
      variant: success ? 'success' : 'error',
    });
  };

  return (
    <Layout title='Tạo bài viết mới'>
      <Typography variant='h5'>Đăng tin/bài</Typography>

      <Box component={Paper} mt={2} p={1}>
        <InputBase
          placeholder='Tiêu đề bài viết'
          classes={{ input: classes.input }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <br />
        <TextEditor value={text} onChange={handleChangeText} />
        <br />
        <Button
          onClick={handleSubmitPost}
          variant='contained'
          color='secondary'
        >
          Đăng tin/bài
        </Button>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const state = req.__nextReduxWrapperStore.getState();

  const { auth } = state;

  const response = await fetch(
    `${process.env.API_URI}${API_SUBCATEGORY_ROUTE}/${params.slug}`
  );

  const { success, data } = await response.json();

  if (!success || !auth.isAuth) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      token: auth.token,
      category: data._id,
    },
  };
};

export default NewPost;
