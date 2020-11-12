import React from 'react';
import { Collapse, Grid } from '@material-ui/core';
// Components
import CategoryCardTitle from './CategoryCardTitle';
import CategoryCardItems from './CategoryCardItems';

const CategoryCardList = ({ title, subCategories }) => {
  const [toggle, setToggle] = React.useState(true);

  const handleToggleCategory = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <React.Fragment>
      <CategoryCardTitle
        title={title}
        toggleShow={toggle}
        handleToggle={handleToggleCategory}
      />
      <br />
      <Collapse in={toggle}>
        <Grid container spacing={1}>
          {subCategories.map((data) => (
            <Grid key={data._id} item xs={12} sm={6} md={4}>
              <CategoryCardItems data={data} />
            </Grid>
          ))}
        </Grid>
      </Collapse>
      <br />
    </React.Fragment>
  );
};

export default CategoryCardList;
