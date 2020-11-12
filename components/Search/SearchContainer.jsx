import React from 'react';
import Router from 'next/router';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import { Grow } from '@material-ui/core';

const SearchContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleSearch = () => {
    if (text.length > 0) {
      Router.push(`/search?q=${text}`);

      return;
    }

    setOpen((prevOpen) => !prevOpen);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  return (
    <React.Fragment>
      <SearchButton onClick={handleSearch} />
      {open && (
        <Grow in={open}>
          <SearchInput
            open={open}
            search={text}
            setSearch={handleSetText}
            placeholder='Search...'
          />
        </Grow>
      )}
    </React.Fragment>
  );
};

export default SearchContainer;
