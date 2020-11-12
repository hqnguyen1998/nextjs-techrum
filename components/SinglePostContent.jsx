import React from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { Card, CardContent, CardActions, IconButton } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import parser from 'html-react-parser';

// Components
import PostCardHeader from '../components/PostCardHeader';

const SinglePostContent = ({ author, content, likes, pid }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuth, token, user } = useSelector((state) => state.auth);

  const filterLike = isAuth && likes.filter((like) => like === user._id).length;

  const likePost = async (value) => {
    const response = await fetch(`${process.env.API_URI}/api/post?pid=${pid}`, {
      method: value === 'like' ? 'PUT' : 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();

    enqueueSnackbar(data.msg, {
      variant: data.success ? 'success' : 'error',
    });
  };

  return (
    <Card>
      <PostCardHeader author={author} />
      <CardContent>{parser(content)}</CardContent>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {filterLike ? (
          <IconButton
            color='primary'
            onClick={() => likePost('unlike')}
            disabled={isAuth ? false : true}
          >
            <Favorite />
          </IconButton>
        ) : (
          <IconButton
            color='primary'
            onClick={() => likePost('like')}
            disabled={isAuth ? false : true}
          >
            <FavoriteBorder />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default SinglePostContent;
