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
    <Layout title={data.title}>
      <Breadcrumb>
        <Typography color='textPrimary'>{data.category.title}</Typography>
        <Typography color='textSecondary'>{data.title}</Typography>
      </Breadcrumb>

      <PostListContainer categoryId={data._id} totalPosts={data.posts.length} />
    </Layout>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const response = await fetch(
    `${process.env.API_URI}/api/subcategory/${params.slug}`
  );

  const data = await response.json();

  if (!data.success) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  return {
    props: {
      data: data.data,
    },
  };
};

export default CategoryPage;
