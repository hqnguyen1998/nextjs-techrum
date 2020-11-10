import React from 'react';
import { Pagination } from '@material-ui/lab';
import { Box, Paper } from '@material-ui/core';

const PaginationComponent = ({
  totalItems,
  limitItem,
  currentPage,
  handleChange,
  color,
}) => {
  return (
    <Box component={Paper} p={1} mt={1}>
      <Pagination
        count={Math.ceil(totalItems / limitItem)}
        page={currentPage}
        color={color}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PaginationComponent;
