import { createMuiTheme } from '@material-ui/core';

const getTheme = (type, primaryText, secondaryText) => {
  return createMuiTheme({
    palette: {
      type: type,
      primary: {
        main: '#46a7ea',
        contrastText: primaryText,
      },
      secondary: {
        main: '#f04d6a',
        contrastText: secondaryText,
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: 'Quicksand, sans-serif',
    },
  });
};

const theme = (value) => {
  switch (value) {
    case 'light':
      return getTheme('light', '#333', '#333');
    case 'dark':
      return getTheme('dark', '#fefefe', '#fefefe');
    default:
      return getTheme('light', '#333', '#333');
  }
};

export default theme;
