import React from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Button, Typography } from '@material-ui/core';

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
        <Link href={`/category/${data.slug}`}>
          <a>
            <Typography color='textSecondary'>{data.title}</Typography>
          </a>
        </Link>
      </Breadcrumb>
      <br />
      <Button variant='contained' color='secondary' fullWidth>
        Đăng bài
      </Button>

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
