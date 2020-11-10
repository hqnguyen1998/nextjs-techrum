import React from 'react';
import Link from 'next/link';
import {
  Box,
  Breadcrumbs,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Breadcrumb = ({ children }) => {
  const classes = useStyles();
  return (
    <Box component={Paper} p={2} mb={1}>
      <Breadcrumbs aria-label='breadcrumb' separator='›'>
        <Link href='/'>
          <a className={classes.link}>
            <Home className={classes.icon} color='primary' />
            <Typography color='textPrimary'>Diễn đàn</Typography>
          </a>
        </Link>
        {children}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
