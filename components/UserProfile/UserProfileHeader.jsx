import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
// Components
import UserProfileAvatar from './UserProfileAvatar';
import UserProfileBasicInformation from './UserProfileBasicInformation';

const UserProfileHeader = () => {
  const classes = useStyles();
  const { profile, isLoading } = useSelector((state) => state.member);

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3}>
          <div className={classes.avatarContainer}>
            {!isLoading && (
              <UserProfileAvatar
                src={profile.avatar}
                alt={profile.username}
                className={classes.avatar}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          {!isLoading && (
            <React.Fragment>
              <Typography
                variant='h5'
                color='textPrimary'
                className={classes.usernameText}
              >
                {profile.fullName ? profile.fullName : profile.username}
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                className={classes.usernameText}
              >
                {profile.bio}
              </Typography>
            </React.Fragment>
          )}
          <br />
          <Divider />
          <br />
          {!isLoading && (
            <UserProfileBasicInformation
              joined_date={profile.joined_date}
              total_posts={profile.posts.length}
              total_comments={profile.comments.length}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '200px',
  },
  avatar: {
    width: '90%',
    height: '90%',
    margin: 'auto',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  usernameText: {
    textTransform: 'uppercase',
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  input: {
    display: 'none',
  },
}));

export default UserProfileHeader;
