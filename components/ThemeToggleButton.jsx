import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTheme } from '../redux/actions/configActions';
import { IconButton } from '@material-ui/core';
import { BrightnessLowRounded, Brightness4Rounded } from '@material-ui/icons';

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.config);

  //   const [defaultTheme, setDefaultTheme] = React.useState(theme);

  const handleSetTheme = (value) => {
    dispatch(setPageTheme(value));
  };

  return theme === 'dark' ? (
    <IconButton
      color='inherit'
      onClick={() => handleSetTheme('light')}
      style={{ color: '#fff' }}
    >
      <Brightness4Rounded />
    </IconButton>
  ) : (
    <IconButton
      color='inherit'
      onClick={() => handleSetTheme('dark')}
      style={{ color: '#fff' }}
    >
      <BrightnessLowRounded />
    </IconButton>
  );
};

export default ThemeToggleButton;
