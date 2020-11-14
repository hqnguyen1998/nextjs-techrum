import { Avatar } from '@material-ui/core';
import React from 'react';

const UserProfileAvatar = ({ src, alt, onClick, ...otherProps }) => {
  return <Avatar src={src} alt={alt} onClick={onClick} {...otherProps} />;
};

export default UserProfileAvatar;
