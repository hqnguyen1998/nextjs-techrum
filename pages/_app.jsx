import React from 'react';
import cookies from 'next-cookies';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, useStore } from 'react-redux';
import { fetcher } from '../src/api-fetcher';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import theme from '../src/theme';
// Components
import Navbar from '../components/Navbar/Navbar';
// Redux Store
import { wrapper } from '../redux/store';
import { authUser } from '../redux/actions/authActions';
import { fetchPageConfig } from '../redux/actions/configActions';
// Global Css
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const config = useSelector((state) => state.config);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme('dark')}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider maxSnack={3}>
            <Navbar title='Techrum' />
            <Component {...pageProps} />
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </PersistGate>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = cookies(ctx);

  if (token) {
    const auth = await fetcher(`${process.env.API_URI}/api/auth`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    ctx.store.dispatch(authUser(auth));
  }

  const config = await fetcher(`${process.env.API_URI}/api/config`);

  ctx.store.dispatch(fetchPageConfig(config.data));

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
