import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
// Components
import CategoryListItem from './CategoryListItem';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CategoryContainer = () => {
  const { data, error } = useSWR('/api/category', fetcher);
  if (error) return <div>failed to load</div>;

  return (
    <React.Fragment>
      {data ? (
        data.data.map((data) => (
          <CategoryListItem
            key={data._id}
            title={data.title}
            subCategories={data.subCategory}
          />
        ))
      ) : (
        <Box mt={2} p={2}>
          <Skeleton variant='rect' height={50} />
          <br />
          <Grid container spacing={2}>
            {Array.from({ length: 6 }, (v, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card style={{ height: 365 }}>
                  <Skeleton variant='rect' height={160} />
                  <CardContent>
                    <Skeleton variant='text' height={20} />
                    <br />
                    <Skeleton variant='text' height={10} width={100} />
                  </CardContent>
                  <Divider light />
                  <CardActions>
                    <Skeleton variant='rect' height={30} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CategoryContainer;
