import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

// layouts
import Layout from '../../layouts/Layout';
// Components
import Breadcrumb from '../../components/Breadcrumb';
import PostCommentListContainer from '../../components/PostCommentListContainer';
import TextEditor from '../../components/TextEditor';
import SinglePostContent from '../../components/SinglePostContent';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Post = ({ title, pid, slug }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { data, error } = useSWR(
    `${process.env.API_URI}/api/post/${slug}/${pid}`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    }
  );
  if (error) return <div>failed to load</div>;

  return (
    <Layout title={title}>
      {/* Breadcrumb */}
      {data ? (
        <Breadcrumb>
          <Typography color='textPrimary'>
            {data.data.category.category.title}
          </Typography>
          <Link
            href='/category/[slug]'
            as={`/category/${data.data.category.slug}`}
          >
            <a>
              <Typography color='textPrimary' noWrap>
                {data.data.category.title}
              </Typography>
            </a>
          </Link>
          <Typography color='textSecondary' noWrap>
            {data.data.title}
          </Typography>
        </Breadcrumb>
      ) : (
        <Box mt={2}>
          <Skeleton variant='rect' height={65} />
        </Box>
      )}

      {/* Post Content */}
      {data ? (
        <SinglePostContent
          author={data.data.author}
          content={data.data.content}
          likes={data.data.likes}
          pid={data.data._id}
        />
      ) : (
        <Box mt={2}>
          <Skeleton variant='rect' height={500} />
        </Box>
      )}

      {/* List Comments */}
      {data ? (
        <PostCommentListContainer comments={data.data.comments} />
      ) : (
        Array.from({ length: 5 }, (v, i) => (
          <Box key={i} mt={2}>
            <Skeleton variant='rect' height={65} />
          </Box>
        ))
      )}

      {/* Comments Editor */}
      {isAuth && data ? (
        <TextEditor pid={data.data._id} />
      ) : (
        <Typography variant='body1'>
          Please login for your first comment
        </Typography>
      )}
    </Layout>
  );
};

Post.getInitialProps = async (ctx) => {
  const { query, res } = ctx;
  const splitSlug = query.slug.split('.');

  const response = await fetch(
    `${process.env.API_URI}/api/post/${splitSlug[0]}/${splitSlug[1]}`
  );

  const { success, data } = await response.json();

  if (!success) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return {};
  }

  return {
    title: data.title,
    slug: data.slug,
    pid: data._id,
  };
};

export default Post;
