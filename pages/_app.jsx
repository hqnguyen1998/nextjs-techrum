import React from 'react';
import cookies from 'next-cookies';
import MomentUtils from '@date-io/moment';
import { useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { fetcher } from '../src/api-fetcher';

// Config
import { API_AUTH_ROUTE, API_CONFIG_ROUTE } from '../config/config.json';
import theme from '../src/theme';
// Components
import Navbar from '../components/Navbar/Navbar';
// Redux Store
import { wrapper } from '../redux/store';
// import { wrapper } from '../redux/store';
import { authUser } from '../redux/actions/authActions';
import { fetchPageConfig } from '../redux/actions/configActions';
// Global Css
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const x = useSelector((state) => state.config.theme);
  const title = useSelector((state) => state.config.config.pageTitle);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme(x)}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={3}>
          <Navbar title={title} />
          <Component {...pageProps} />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = cookies(ctx);

  const auth = await fetcher(`${process.env.API_URI}${API_AUTH_ROUTE}`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  });
  const config = await fetcher(`${process.env.API_URI}${API_CONFIG_ROUTE}`);

  ctx.store.dispatch(fetchPageConfig(config.data));
  ctx.store.dispatch(authUser(auth));

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
