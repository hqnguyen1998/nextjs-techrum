import React from 'react';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
// Components
import CategoryListItem from './CategoryListItem';
import { LinearProgress } from '@material-ui/core';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CategoryContainer = () => {
  const { data, error } = useSWR('/api/category', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <LinearProgress variant='indeterminate' color='primary' />;

  return (
    <React.Fragment>
      {data.data.map((data) => (
        <CategoryListItem
          key={data._id}
          title={data.title}
          subCategories={data.subCategory}
        />
      ))}
    </React.Fragment>
  );
};

export default CategoryContainer;
