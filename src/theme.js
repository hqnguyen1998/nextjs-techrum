import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#46a7ea',
    },
    secondary: {
      main: '#e5127d',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Quicksand, sans-serif',
  },
});

export default theme;
