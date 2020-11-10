import React from 'react';
import Link from 'next/link';
import {
  Avatar,
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

const CategoryList = ({ data }) => {
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
      <CardActions>
        <div style={{ display: 'flex', width: '100%' }}>
          <div>
            <Avatar
              src='https://pbs.twimg.com/profile_images/1145405669287161856/ewpzgfmO.jpg'
              alt='avatar image'
            />
          </div>
          <div style={{ width: '80%', marginLeft: 5 }}>
            <Typography variant='body1' noWrap>
              Mang khủng long từ kỷ Jura trở về qua mô hình AR 3D từ Google Tìm
              Kiếm 123123131231
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              19/10/20
            </Typography>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default CategoryList;
