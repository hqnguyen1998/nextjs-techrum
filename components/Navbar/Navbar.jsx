import React from 'react';
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
  Avatar,
} from '@material-ui/core';
import {
  ExitToAppOutlined,
  PersonAddOutlined,
  MailOutline,
  NotificationsOutlined,
} from '@material-ui/icons';

// Components
import DialogContainer from '../DialogContainer';
// Redux Actions
import { signOut } from '../../redux/actions/authActions';
import LoginForm from '../LoginForm';
import SearchContainer from '../Search/SearchContainer';

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

const Navbar = ({ title }) => {
  const dispatch = useDispatch();
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

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <React.Fragment>
      <AppBar position='fixed' color='inherit' elevation={0}>
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
              <AuthMenu userAvatar={user.avatar} signOut={handleSignOut} />
            )}

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
  return (
    <ButtonGroup variant='text' color='inherit'>
      <Button
        startIcon={<ExitToAppOutlined />}
        color='secondary'
        onClick={setOpen}
      >
        <Typography>Đăng nhập</Typography>
      </Button>
      <Button startIcon={<PersonAddOutlined />} color='primary'>
        <Link href='/register'>
          <a>
            <Typography color='primary'>Đăng ký</Typography>
          </a>
        </Link>
      </Button>
    </ButtonGroup>
  );
};

const AuthMenu = ({ userAvatar, signOut }) => {
  return (
    <React.Fragment>
      <IconButton>
        <Avatar src={userAvatar} style={{ width: '30px', height: '30px' }} />
      </IconButton>
      <IconButton>
        <MailOutline />
      </IconButton>
      <IconButton color='primary'>
        <NotificationsOutlined />
      </IconButton>
      <IconButton onClick={signOut}>
        <ExitToAppOutlined />
      </IconButton>
    </React.Fragment>
  );
};

export default Navbar;
