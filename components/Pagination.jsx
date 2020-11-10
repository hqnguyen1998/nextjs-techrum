import React from 'react';
import { Pagination } from '@material-ui/lab';
import { Box, Paper } from '@material-ui/core';

const PaginationComponent = ({
  totalItems,
  limitItem,
  currentPage,
  handleChange,
  color,
  children,
  variant,
  shape = 'rounded',
  size,
}) => {
  return (
    <Box
      component={Paper}
      p={1}
      mt={1}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Pagination
        count={Math.ceil(totalItems / limitItem)}
        page={currentPage}
        color={color}
        shape={shape}
        variant={variant}
        onChange={handleChange}
        size={size}
      />
      {children}
    </Box>
  );
};

export default PaginationComponent;
