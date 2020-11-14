import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Fade, makeStyles, Menu, MenuItem } from '@material-ui/core';
// Redux Actions
import { signOut } from '../../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: 200,
  },
}));

const NavbarProfileMenuListItem = ({ anchorEl, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();

  const handleSignOut = () => {
    dispatch(signOut());
    onClose();
  };

  const handleRoute = (value) => {
    switch (value) {
      case 'profile':
        Router.push(
          `/members/[[...slug]]`,
          `/members/${user.username}/${user._id}`
        );
        break;
      case 'settings':
        Router.push(`/me/settings`);
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      keepMounted
      TransitionComponent={Fade}
      classes={{
        paper: classes.root,
      }}
    >
      <MenuItem onClick={() => handleRoute('profile')}>Profile</MenuItem>
      <MenuItem onClick={() => handleRoute('settings')}>Settings</MenuItem>
      <Divider light />
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );
};

export default NavbarProfileMenuListItem;
