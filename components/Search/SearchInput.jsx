import React from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';

const SearchInput = ({ search, setSearch, placeholder, ...otherProps }) => {
  return (
    <InputBase
      placeholder={placeholder}
      value={search}
      onChange={setSearch}
      {...otherProps}
    />
  );
};

SearchInput.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  placeholder: PropTypes.string,
  otherProps: PropTypes.element,
};

export default SearchInput;
