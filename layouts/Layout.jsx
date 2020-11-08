import React from 'react';
import Head from 'next/head';
import { Box, Container } from '@material-ui/core';

// Components
import Navbar from '../components/Navbar';

const Layout = ({ title, children }) => {
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
