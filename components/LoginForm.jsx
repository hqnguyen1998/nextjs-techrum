import React from 'react';
import { useSnackbar } from 'notistack';
import fetch from 'isomorphic-unfetch';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';

// Redux actions
import { loginUser } from '../redux/actions/authActions';

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        emailOrUsername: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false);

          const response = await fetch(`${process.env.API_URI}/api/auth`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          enqueueSnackbar(data.msg, {
            variant: data.success ? 'success' : 'error',
          });

          dispatch(loginUser(data));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            type='text'
            autoComplete='username'
            component={TextField}
            name='emailOrUsername'
            label='Email or Username'
            variant='outlined'
            margin='dense'
            fullWidth
          />
          <Field
            type='password'
            autoComplete='current-password'
            component={TextField}
            name='password'
            label='Password'
            variant='outlined'
            margin='dense'
            fullWidth
          />
          <Button
            onClick={submitForm}
            disabled={isSubmitting}
            variant='contained'
            color='secondary'
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
