import React from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@material-ui/core';
import { fetcher } from '../src/api-fetcher';
// Redux actions
import { authUser } from '../redux/actions/authActions';
// Cookie
import Cookie from 'js-cookie';
// Components
import Navbar from '../components/Navbar';

const token = Cookie.get('token');

const Layout = ({ title, children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchUser = async () => {
      const data = await fetcher(`${process.env.API_URI}/api/auth`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      dispatch(authUser(data));
    };

    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{title} | TECHRUM</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=Edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Diễn đàn công nghệ hàng đầu Việt Nam'
        />
        <meta
          property='og:description'
          content='Diễn đàn công nghệ hàng đầu Việt Nam'
        />
        <meta
          property='twitter:description'
          content='Diễn đàn công nghệ hàng đầu Việt Nam'
        />
        <meta property='og:type' content='website' />
        <meta name='theme-color' content='#4f80b0' />
      </Head>

      <Navbar />

      <Box mt={10} p={2}>
        <Container maxWidth='lg'>{children}</Container>
      </Box>
    </React.Fragment>
  );
};

export default Layout;
