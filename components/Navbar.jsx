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
} from '@material-ui/core';
import { ExitToAppOutlined, PersonAddOutlined } from '@material-ui/icons';

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
    <AppBar position='fixed' color='transparent'>
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
          {!isAuth ? (
            <ButtonGroup variant='text' color='inherit'>
              <Button
                startIcon={<ExitToAppOutlined />}
                color='secondary'
                onClick={handleOpen}
              >
                Đăng nhập
              </Button>
              <Link href='/register'>
                <a>
                  <Button startIcon={<PersonAddOutlined />}>Đăng ký</Button>
                </a>
              </Link>
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
