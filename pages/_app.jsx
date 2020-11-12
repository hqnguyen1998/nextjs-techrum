import React from 'react';
import cookies from 'next-cookies';
import fetch from 'isomorphic-unfetch';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from '../src/theme';
import Navbar from '../components/Navbar/Navbar';
// Redux Store
import { wrapper } from '../redux/store';
import { authUser } from '../redux/actions/authActions';
import { fetchPageConfig } from '../redux/actions/configActions';
// Global Css
import '../styles/globals.css';
import Layout from '../layouts/Layout';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={3}>
          <Navbar title='Techrum' />
          <Component {...pageProps} />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = cookies(ctx);
  const authRes = await fetch(`${process.env.API_URI}/api/auth`, {
    headers: {
      authorization: token,
    },
  });
  const configRes = await fetch(`${process.env.API_URI}/api/config`);

  const authData = await authRes.json();
  const { data } = await configRes.json();

  ctx.store.dispatch(fetchPageConfig(data));
  ctx.store.dispatch(authUser(authData));

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
