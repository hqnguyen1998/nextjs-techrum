import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
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
  Collapse,
  InputBase,
  Grow,
} from '@material-ui/core';
import {
  ExitToAppOutlined,
  PersonAddOutlined,
  SearchOutlined,
} from '@material-ui/icons';

// Components
import DialogContainer from '../components/DialogContainer';
// Redux Actions
import { signOut } from '../redux/actions/authActions';
import LoginForm from './LoginForm';

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const { isAuth, user } = useSelector((state) => state.auth);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    if (isAuth) {
      handleClose();
    }
  }, [isAuth]);

  const handleSearchButton = () => {
    if (searchText.length > 0) {
      Router.push(`/search?q=${searchText}`);
    } else {
      setOpenSearch((prev) => !prev);
    }
  };

  const handleOpen = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <AppBar position='fixed' color='inherit' elevation={0}>
      <Container maxWidth='lg'>
        <Toolbar>
          <Link href='/' as='/'>
            <a>
              <Typography variant='h4' className={classes.titleText}>
                Techrum
              </Typography>
            </a>
          </Link>
          <div className={classes.root} />
          <IconButton color='inherit' onClick={handleSearchButton}>
            <SearchOutlined />
          </IconButton>
          {openSearch && (
            <Grow in={openSearch}>
              <InputBase
                placeholder='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grow>
          )}

          {!isAuth ? (
            <ButtonGroup variant='text' color='inherit'>
              <Button
                startIcon={<ExitToAppOutlined />}
                color='secondary'
                onClick={handleOpen}
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
          ) : (
            <React.Fragment>
              <Typography variant='body1'>{user.username}</Typography>
              <Button
                variant='text'
                color='secondary'
                onClick={() => dispatch(signOut())}
              >
                Sign Out
              </Button>
            </React.Fragment>
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
  );
};

export default Navbar;
