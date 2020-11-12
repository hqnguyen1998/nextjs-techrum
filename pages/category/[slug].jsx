import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Typography } from '@material-ui/core';

// Layout
import Layout from '../../layouts/Layout';
// Components
import Breadcrumb from '../../components/Breadcrumb';
import PostListContainer from '../../components/PostListContainer';

const CategoryPage = ({ data }) => {
  return (
    <Layout title={data.title.toUpperCase()}>
      <Breadcrumb>
        <Typography color='textPrimary'>{data.category.title}</Typography>
        <Typography color='textSecondary'>{data.title}</Typography>
      </Breadcrumb>

      <PostListContainer categoryId={data._id} />
    </Layout>
  );
};

CategoryPage.getInitialProps = async (ctx) => {
  const { res, query } = ctx;

  const response = await fetch(
    `${process.env.API_URI}/api/subcategory/${query.slug}`
  );

  const { success, data } = await response.json();

  if (!success) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return {};
  }

  return {
    data,
  };
};

export default CategoryPage;
