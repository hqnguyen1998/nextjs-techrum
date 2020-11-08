import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  ButtonGroup,
  Container,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { ExitToAppOutlined, PersonAddOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleText: {
    fontWeight: 400,
    letterSpacing: 2,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed' color='transparent'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Link href='/'>
            <a>
              <Typography variant='h4' className={classes.titleText}>
                Techrum
              </Typography>
            </a>
          </Link>
          <div className={classes.root} />
          <ButtonGroup variant='text' color='inherit'>
            <Button startIcon={<ExitToAppOutlined />} color='secondary'>
              Đăng nhập
            </Button>
            <Button startIcon={<PersonAddOutlined />}>Đăng ký</Button>
          </ButtonGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
