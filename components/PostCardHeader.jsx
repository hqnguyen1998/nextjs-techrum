import Moment from 'react-moment';
import {
  CardHeader,
  Avatar,
  Box,
  Typography,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  titleText: {
    fontWeight: 600,
    fontSize: 20,
    color: theme.palette.primary.main,
  },
  actionText: {
    color: theme.palette.common.white,
    fontWeight: 600,
  },
}));

const PostCardHeader = ({ author }) => {
  const classes = useStyles();
  return (
    <CardHeader
      avatar={<Avatar src={author.avatar} alt={author.username} />}
      action={
        <Hidden xsDown>
          <Box m={1}>
            <Typography variant='subtitle1' color='textSecondary'>
              Tham gia:{' '}
              <span className={classes.actionText}>
                <Moment format='MM/DD/YY'>{author.joined_date}</Moment>
              </span>
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Bài viết:{' '}
              <span className={classes.actionText}>{author.posts.length}</span>
            </Typography>
          </Box>
        </Hidden>
      }
      title={author.username}
      subheader={author.email}
      classes={{
        title: classes.titleText,
      }}
    />
  );
};

export default PostCardHeader;
