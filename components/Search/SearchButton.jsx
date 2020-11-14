import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const SearchButton = ({ onClick, color = 'inherit' }) => {
  return (
    <IconButton color={color} onClick={onClick} style={{ color: '#fff' }}>
      <SearchOutlined />
    </IconButton>
  );
};

SearchButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default SearchButton;
