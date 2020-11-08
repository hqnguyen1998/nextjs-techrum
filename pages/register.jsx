import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { Box, makeStyles, Paper, Typography, Button } from '@material-ui/core';

// Components
import Layout from '../layouts/Layout';

const useStyles = makeStyles(() => ({
  titleText: {
    fontWeight: '600',
    fontSize: '24px',
  },
}));

const Register = () => {
  const classes = useStyles();

  return (
    <Layout title='Đăng ký'>
      <Typography variant='h5' className={classes.titleText}>
        Register User
      </Typography>
      <br />
      <Box component={Paper} square p={2}>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            dob: new Date('03-22-1998'),
            isAcceptPolicy: false,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);

              console.log(values);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name='username'
                label='Username'
                variant='outlined'
                margin='dense'
                fullWidth
              />
              <Field
                type='text'
                autoComplete='username'
                component={TextField}
                name='email'
                label='Email Address'
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
              <Field
                component={DatePicker}
                label='DOB'
                name='dob'
                variant='dialog'
                inputVariant='outlined'
                margin='dense'
                fullWidth
              />
              <Field
                component={CheckboxWithLabel}
                type='checkbox'
                name='isAcceptPolicy'
                Label={{
                  label: 'I accept with the policy and rules of Techrum',
                }}
              />
              <br />
              <br />
              <Button
                variant='contained'
                color='secondary'
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default Register;
