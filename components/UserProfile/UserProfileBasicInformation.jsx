import React from 'react';
import Moment from 'react-moment';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#333',
    fontWeight: 800,
  },
}));

const UserProfileBasicInformation = ({
  joined_date,
  total_posts,
  total_comments,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        Tham gia <br />
        <span className={classes.text}>
          <Moment format='MM/DD/YY'>{joined_date}</Moment>
        </span>
      </Typography>
      <Typography variant='body1'>
        Bài viết <br />
        <span className={classes.text}>{total_posts}</span>
      </Typography>
      <Typography variant='body1'>
        Bình luận <br />
        <span className={classes.text}>{total_comments}</span>
      </Typography>
    </div>
  );
};

export default UserProfileBasicInformation;
