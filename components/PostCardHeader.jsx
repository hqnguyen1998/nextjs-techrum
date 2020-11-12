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
    textTransform: 'capitalize',
  },
  actionText: {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  accountType: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fdc22d',
    width: '150px',
    borderRadius: '2px',
  },
  accountTypeText: {
    fontWeight: 800,
    textTransform: 'capitalize',
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
            <Typography variant='subtitle1' color='textSecondary'>
              Bình luận:{' '}
              <span className={classes.actionText}>
                {author.comments.length}
              </span>
            </Typography>
          </Box>
        </Hidden>
      }
      title={author.username}
      subheader={
        <div>
          <Typography variant='caption'>{author.email}</Typography>
          <Box component='div' p={0.5} className={classes.accountType}>
            <Typography color='textPrimary' className={classes.accountTypeText}>
              {author.accountType}
            </Typography>
          </Box>
        </div>
      }
      classes={{
        title: classes.titleText,
      }}
    />
  );
};

export default PostCardHeader;
