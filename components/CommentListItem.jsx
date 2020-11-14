import React from 'react';
import Moment from 'react-moment';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  infoText: {
    textTransform: 'capitalize',
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
  },
}));

const CommentListItem = ({
  comment: {
    author: {
      avatar,
      username,
      bio,
      fullName,
      email,
      joined_date,
      comments,
      posts,
    },
    body,
  },
}) => {
  const classes = useStyles();
  return (
    <Box component={Paper} mt={2} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2} className={classes.root}>
          <Avatar
            variant='square'
            src={avatar}
            alt={username}
            className={classes.avatar}
          />

          <Typography variant='h6' className={classes.infoText}>
            {fullName ? fullName : username}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {email}
          </Typography>

          <Box mt={2} className={classes.infoContainer}>
            <div>
              <Typography variant='caption' color='textSecondary'>
                Ngày Tham gia:{' '}
                <span className={classes.infoText}>
                  <Moment format='MM/DD/YYYY'>{joined_date}</Moment>
                </span>
              </Typography>
            </div>
            <div>
              <Typography variant='caption' color='textSecondary'>
                Bình luận:{' '}
                <span className={classes.infoText}>{comments.length}</span>
              </Typography>
            </div>
            <div>
              <Typography variant='caption' color='textSecondary'>
                Bài viết:{' '}
                <span className={classes.infoText}>{posts.length}</span>
              </Typography>
            </div>
            {bio && (
              <div>
                <Typography variant='caption' color='textSecondary'>
                  Bio: <span className={classes.infoText}>{bio}</span>
                </Typography>
              </div>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentListItem;
