import React from 'react';
import NavbarProfileAvatarButton from './NavbarProfileAvatarButton';
import NavbarProfileMenuListItem from './NavbarProfileMenuListItem';

function NavbarProfileMenuContainer({ avatar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <NavbarProfileAvatarButton avatar={avatar} onClick={handleOpen} />
      <NavbarProfileMenuListItem anchorEl={anchorEl} onClose={handleClose} />
    </React.Fragment>
  );
}

export default NavbarProfileMenuContainer;
