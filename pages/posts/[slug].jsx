import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

// layouts
import Layout from '../../layouts/Layout';
// Components
import Breadcrumb from '../../components/Breadcrumb';
import PostCardHeader from '../../components/PostCardHeader';
import PostCommentListContainer from '../../components/PostCommentListContainer';
import TextEditor from '../../components/TextEditor';

const Post = ({ post }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout title={post.title}>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Typography color='textPrimary'>
          {post.category.category.title}
        </Typography>
        <Link href='/category/[slug]' as={`/category/${post.category.slug}`}>
          <a>
            <Typography color='textPrimary' noWrap>
              {post.category.title}
            </Typography>
          </a>
        </Link>
        <Typography color='textSecondary' noWrap>
          {post.title}
        </Typography>
      </Breadcrumb>

      {/* Post Content */}
      <Card>
        <PostCardHeader author={post.author} />
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton>
            <ThumbUp />
          </IconButton>
        </CardActions>
      </Card>

      {/* List Comments */}
      <PostCommentListContainer pid={post._id} />

      {/* Comments Editor */}
      {isAuth ? (
        <TextEditor pid={post._id} />
      ) : (
        <Typography variant='body1'>
          Please login for your first comment
        </Typography>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const { slug } = params;
  const splitSlug = slug.split('.');

  const response = await fetch(
    `${process.env.API_URI}/api/post/${splitSlug[0]}/${splitSlug[1]}`
  );

  const data = await response.json();

  if (!data.success) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      post: data.data,
    },
  };
};

export default Post;
