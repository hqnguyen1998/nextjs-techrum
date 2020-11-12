import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Typography } from '@material-ui/core';
// Config
import { API_SUBCATEGORY_ROUTE } from '../../../config/config.json';
// Layout
import Layout from '../../../layouts/Layout';
// Components
import Breadcrumb from '../../../components/Breadcrumb';
import PostListContainer from '../../../components/PostListContainer';

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

export const getServerSideProps = async ({ params, res, req }) => {
  const response = await fetch(
    `${process.env.API_URI}${API_SUBCATEGORY_ROUTE}/${params.slug}`
  );

  const { success, data } = await response.json();

  if (!success) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default CategoryPage;
