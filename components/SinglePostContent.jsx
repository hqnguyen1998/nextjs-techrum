import React from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { fetcher } from '../src/api-fetcher';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
// HTML Parser
import parser from 'html-react-parser';
// Config
import { API_POST_ROUTE } from '../config/config.json';
// Components
import PostCardHeader from '../components/PostCardHeader';

const SinglePostContent = ({ author, content, likes, pid }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuth, token, user } = useSelector((state) => state.auth);

  const filterLike = isAuth && likes.filter((like) => like === user._id).length;

  const likePost = async (value) => {
    const data = await fetcher(
      `${process.env.API_URI}${API_POST_ROUTE}?pid=${pid}`,
      {
        method: value === 'like' ? 'PUT' : 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

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
        <React.Fragment>
          <IconButton
            color='primary'
            onClick={() => likePost(filterLike ? 'unlike' : 'like')}
            disabled={isAuth ? false : true}
          >
            {filterLike ? <Favorite /> : <FavoriteBorder />}
            <Typography variant='body1'>+{likes.length}</Typography>
          </IconButton>
        </React.Fragment>
      </CardActions>
    </Card>
  );
};

export default SinglePostContent;
