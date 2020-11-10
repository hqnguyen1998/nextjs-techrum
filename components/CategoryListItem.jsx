import { Box, Collapse, Grid, Paper } from '@material-ui/core';
import React from 'react';
import CategoryList from './CategoryList';
import CategoryListHeader from './CategoryListHeader';

const CategoryListItem = ({ title, subCategories }) => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggleCategory = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <React.Fragment>
      <CategoryListHeader
        title={title}
        toggleShow={toggle}
        handleToggle={handleToggleCategory}
      />
      <br />
      <Collapse in={toggle}>
        <Grid container spacing={1}>
          {subCategories.map((data) => (
            <Grid key={data._id} item xs={12} sm={6} md={4}>
              <CategoryList data={data} />
            </Grid>
          ))}
        </Grid>
      </Collapse>
      <br />
    </React.Fragment>
  );
};

export default CategoryListItem;
