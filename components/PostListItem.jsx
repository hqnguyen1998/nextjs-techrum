import React from 'react';
import Link from 'next/link';
import {
  TableRow,
  TableCell,
  Avatar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titleText: {
    fontWeight: 600,
  },
  totalText: {
    fontWeight: 800,
    color: theme.palette.text.primary,
  },
}));

const PostListItem = ({ post }) => {
  const classes = useStyles();

  return (
    <TableRow key={post._id}>
      <TableCell>
        <IconButton size='small'>
          <Link
            href='/members/[[...slug]]'
            as={`/members/${post.author.username}/${post.author._id}`}
          >
            <a>
              <Avatar src={post.author.avatar} alt={post.author.username} />
            </a>
          </Link>
        </IconButton>
      </TableCell>
      <TableCell>
        <Link href='/posts/[slug]' as={`/posts/${post.slug}.${post._id}`}>
          <a>
            <Typography
              variant='body1'
              align='justify'
              color='textPrimary'
              className={classes.titleText}
            >
              {post.title}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {post.author.username}
            </Typography>
          </a>
        </Link>
      </TableCell>
      <TableCell>
        <div style={{ display: 'flex' }}>
          <Typography variant='body1' color='textSecondary'>
            Lượt trả lời:{' '}
            <span className={classes.totalText}>{post.comments.length}</span>
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostListItem;
