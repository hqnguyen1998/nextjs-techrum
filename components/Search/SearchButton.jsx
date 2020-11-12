import React from 'react';
import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const SearchButton = ({ onClick, color }) => {
  return (
    <IconButton color={color} onClick={onClick}>
      <SearchOutlined />
    </IconButton>
  );
};

export default SearchButton;
