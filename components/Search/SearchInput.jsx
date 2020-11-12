import React from 'react';
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

export default SearchInput;
