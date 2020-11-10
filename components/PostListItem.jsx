import React from 'react';
import Link from 'next/link';
import { TableRow, TableCell, Avatar, Typography } from '@material-ui/core';

const PostListItem = ({ post }) => {
  return (
    <TableRow key={post._id}>
      <TableCell>
        <Avatar src={post.author.avatar} />
      </TableCell>
      <TableCell>
        <Link href='/posts/[slug]' as={`/posts/${post.slug}.${post._id}`}>
          <a>
            <Typography variant='body1' align='justify' color='textPrimary'>
              {post.title}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {post.author.username}
            </Typography>
          </a>
        </Link>
      </TableCell>
      <TableCell>
        <div>
          <Typography variant='body1' color='textSecondary'>
            Lượt trả lời
          </Typography>
          <Typography variant='body1' color='textPrimary'>
            {post.comments.length}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostListItem;
