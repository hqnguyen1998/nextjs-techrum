import React from 'react';
import { useDispatch } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from '../src/theme';

// Cookie
import Cookie from 'js-cookie';

// Redux Store & type
import { wrapper } from '../redux/store';
import { AUTH_USER, AUTH_USER_FAILED } from '../redux/reducer/auth/authTypes';
// Global Css
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const token = Cookie.get('token');

    const fetchUser = async () => {
      const response = await fetch(`${process.env.API_URI}/api/auth`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (!data.success) {
        return dispatch({
          type: AUTH_USER_FAILED,
          payload: data,
        });
      } else {
        return dispatch({
          type: AUTH_USER,
          payload: data,
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      pathname: ctx.pathname,
    },
  };
};

export default wrapper.withRedux(MyApp);
