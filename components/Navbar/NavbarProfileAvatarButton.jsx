import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';

const NavbarProfileAvatarButton = ({
  avatar,
  alt,
  size,
  onClick,
  ...otherProps
}) => {
  return (
    <IconButton size={size} onClick={onClick}>
      <Avatar
        src={avatar}
        alt={alt}
        {...otherProps}
        style={{ width: '30px', height: '30px' }}
      />
    </IconButton>
  );
};

export default NavbarProfileAvatarButton;
