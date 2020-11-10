import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { fetchPostComments } from '../redux/actions/commentActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '75px',
    height: '75px',
  },
  userContent: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const PostCommentListContainer = ({ pid }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { comments, isLoading } = useSelector((state) => state.comment);

  React.useEffect(() => {
    dispatch(fetchPostComments(pid));
  }, []);

  if (isLoading) {
    return Array.from({ length: 5 }, (v, i) => (
      <Box key={i} mt={2} mb={2}>
        <Skeleton variant='rect' height={200} />
      </Box>
    ));
  }

  return comments.map((comment) => (
    <Box key={comment._id} component={Paper} mt={2} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2} className={classes.root}>
          <Avatar
            variant='square'
            src={comment.author.avatar}
            alt={comment.author.username}
            className={classes.avatar}
          />

          <Typography variant='h6'>{comment.author.username}</Typography>
          <Typography variant='caption' color='textSecondary'>
            {comment.author.email}
          </Typography>
          <br />
          <div>
            <Typography variant='caption' color='textSecondary'>
              Ngày Tham gia:{' '}
              <span style={{ color: '#fff', fontWeight: 600 }}>
                <Moment format='MM/DD/YYYY'>
                  {comment.author.joined_date}
                </Moment>
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant='caption' color='textSecondary'>
              Bình luận:{' '}
              <span style={{ color: '#fff', fontWeight: 600 }}>
                {comment.author.comments.length}
              </span>
            </Typography>
          </div>
          <div>
            <Typography variant='caption' color='textSecondary'>
              Bài viết:{' '}
              <span style={{ color: '#fff', fontWeight: 600 }}>
                {comment.author.posts.length}
              </span>
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          <div dangerouslySetInnerHTML={{ __html: comment.body }} />
        </Grid>
      </Grid>
    </Box>
  ));
};

export default PostCommentListContainer;
