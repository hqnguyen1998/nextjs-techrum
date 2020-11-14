import React from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '365px',
  },
  cardImage: {
    height: 160,
    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 50% 100%, 0 80%)',
  },
  cardTitle: {
    fontWeight: 800,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  postSummary: {
    textAlign: 'center',
  },
  postSummaryTotal: {
    fontWeight: 600,
  },
}));

const CategoryCardItems = ({ data }) => {
  const classes = useStyles();

  const { title, image, posts, slug } = data;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardImage} image={image} title={title} />
      <CardContent>
        <Link href={`/category/${slug}`}>
          <a>
            <Typography
              variant='h6'
              color='secondary'
              align='center'
              className={classes.cardTitle}
            >
              {title}
            </Typography>
          </a>
        </Link>

        <br />
        <div className={classes.postSummary}>
          <Typography variant='body1' className={classes.postSummaryTotal}>
            {posts.length}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Bài viết
          </Typography>
        </div>
      </CardContent>
      <Divider light />
      {posts.length > 0 && (
        <CardActions>
          <Box
            p={2}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Link
              href='/members/[[...slug]]'
              as={`/members/${posts[posts.length - 1].author.username}/${
                posts[posts.length - 1].author._id
              }`}
            >
              <a>
                <Avatar
                  src={posts[posts.length - 1].author.avatar}
                  alt={posts[posts.length - 1].authorusername}
                />
              </a>
            </Link>
            <div style={{ width: '80%' }}>
              <Link
                href='/posts/[slug]'
                as={`/posts/${posts[posts.length - 1].slug}.${
                  posts[posts.length - 1]._id
                }`}
              >
                <a>
                  <Typography
                    variant='body1'
                    className={classes.cardTitle}
                    color='secondary'
                    noWrap
                  >
                    {posts[posts.length - 1].title}
                  </Typography>
                </a>
              </Link>

              <Typography variant='body1' color='textSecondary'>
                <Moment format='DD/MM/YY'>
                  {posts[posts.length - 1].posted_date}
                </Moment>
              </Typography>
            </div>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default CategoryCardItems;
