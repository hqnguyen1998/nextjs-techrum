import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

// Components
import Layout from '../layouts/Layout';
import RegisterForm from '../components/Register/RegisterForm';

const useStyles = makeStyles(() => ({
  titleText: {
    fontWeight: '600',
    fontSize: '24px',
  },
}));

const Register = () => {
  const classes = useStyles();

  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) return Router.push('/');
  }, [isAuth]);

  return (
    <Layout title='Đăng ký'>
      <Typography variant='h5' className={classes.titleText}>
        Register User
      </Typography>
      <br />
      <Box component={Paper} square p={2}>
        <RegisterForm />
      </Box>
    </Layout>
  );
};

export const getServerSideProps = ({ req, res }) => {
  const token = req.cookies.token;

  if (token) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
};

export default Register;
