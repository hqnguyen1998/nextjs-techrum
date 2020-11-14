import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { Box, Container } from '@material-ui/core';

const Layout = ({ title, children }) => {
  const { config, isLoading } = useSelector((state) => state.config);

  return (
    <React.Fragment>
      <Head>
        <title>
          {!isLoading && title
            ? `${title} | ${config.pageTitle || ''}`
            : config.pageTitle || ''}
        </title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=Edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={config.pageMeta} />
        <meta property='og:description' content={config.pageMeta} />
        <meta property='twitter:description' content={config.pageMeta} />
        <meta property='og:type' content='website' />
        <meta name='theme-color' content='#4f80b0' />
      </Head>

      <Box mt={10} p={2}>
        <Container maxWidth='lg'>{children}</Container>
      </Box>
    </React.Fragment>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
