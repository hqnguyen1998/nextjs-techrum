import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  AppBar,
  ButtonGroup,
  Container,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import {
  ExitToAppOutlined,
  PersonAddOutlined,
  MailOutline,
  NotificationsOutlined,
} from '@material-ui/icons';

// Components
import DialogContainer from '../DialogContainer';
import NavbarProfileMenuContainer from '../Navbar/NavbarProfileMenuContainer';
// Redux Actions
import LoginForm from '../LoginForm';
import SearchContainer from '../Search/SearchContainer';
import ThemeToggleButton from '../ThemeToggleButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleText: {
    fontWeight: 400,
    letterSpacing: 2,
    color: theme.palette.common.white,
    textTransform: 'uppercase',
  },
  button: {
    color: theme.palette.common.white,
  },
}));

const Navbar = ({ title }) => {
  const classes = useStyles();

  const { isAuth, user } = useSelector((state) => state.auth);
  const [openLogin, setOpenLogin] = React.useState(false);

  React.useEffect(() => {
    if (isAuth) {
      handleClose();
    }
  }, [isAuth]);

  const handleOpen = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <React.Fragment>
      <AppBar position='fixed' color='secondary' elevation={0}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Link href='/' as='/'>
              <a>
                <Typography variant='h4' className={classes.titleText}>
                  {title}
                </Typography>
              </a>
            </Link>
            <div className={classes.root} />

            {/* Search  */}
            <SearchContainer />

            {/* User Menu */}
            {!isAuth ? (
              <NonAuthMenu setOpen={handleOpen} />
            ) : (
              <AuthMenu userAvatar={user.avatar} />
            )}

            <ThemeToggleButton />

            <DialogContainer
              open={openLogin}
              handleClose={handleClose}
              title='Login User'
            >
              <DialogContent>
                <LoginForm handleClose={handleClose} />
              </DialogContent>
            </DialogContainer>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

const NonAuthMenu = ({ setOpen }) => {
  const classes = useStyles();
  return (
    <ButtonGroup variant='outlined' color='inherit'>
      <Button
        className={classes.button}
        startIcon={<ExitToAppOutlined />}
        onClick={setOpen}
      >
        <Typography>Đăng nhập</Typography>
      </Button>
      <Button
        className={classes.button}
        startIcon={<PersonAddOutlined />}
        onClick={() => Router.push('/register')}
      >
        <Typography>Đăng ký</Typography>
      </Button>
    </ButtonGroup>
  );
};

const AuthMenu = ({ userAvatar }) => {
  return (
    <React.Fragment>
      <NavbarProfileMenuContainer avatar={userAvatar} />
      <IconButton>
        <MailOutline />
      </IconButton>
      <IconButton color='primary'>
        <NotificationsOutlined />
      </IconButton>
    </React.Fragment>
  );
};

export default Navbar;
