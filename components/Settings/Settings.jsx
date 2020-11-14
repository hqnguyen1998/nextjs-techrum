import {
  Box,
  Button,
  Divider,
  InputBase,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import SettingInputContainer from './SettingInputContainer';

const Settings = () => {
  const classes = useStyles();
  return (
    <Box component={Paper} p={2}>
      <Typography variant='h4' className={classes.headingTitle}>
        About you
      </Typography>
      <br />
      <Divider />
      <br />
      <SettingInputContainer
        title='Full Name'
        name='fullName'
        placeholder='Add your fullname'
      />
      <SettingInputContainer
        title='Username'
        name='username'
        placeholder='Add your username'
        disabled
      />
      <SettingInputContainer
        title='Email Address'
        name='email'
        placeholder='Add your email address'
        disabled
      />
      <SettingInputContainer
        title='Bio'
        name='bio'
        placeholder='Add your bio'
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  headingTitle: {
    fontWeight: 800,
    textTransform: 'capitalize',
  },
}));

export default Settings;
