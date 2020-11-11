import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#46a7ea',
      contrastText: '#000',
    },
    secondary: {
      main: '#f04d6a',
      contrastText: '#000',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Quicksand, sans-serif',
  },
});

export default theme;
