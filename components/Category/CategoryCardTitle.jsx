import React from 'react';
import {
  Box,
  Typography,
  Paper,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: 5,
    width: '55%',
  },
}));

const CategoryCardTitle = ({ title, toggleShow, handleToggle }) => {
  const classes = useStyles();

  return (
    <Box component={Paper} square className={classes.categoryHeader}>
      <Typography variant='h4' className={classes.categoryText}>
        {title}
      </Typography>
      <IconButton onClick={handleToggle}>
        {!toggleShow ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
    </Box>
  );
};

export default CategoryCardTitle;
