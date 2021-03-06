import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { Button } from '@material-ui/core';
// Redux actions
import { registerUser } from '../../redux/actions/authActions';
// Validation
import { registerValidation } from '../../src/validationForm';

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        fullName: '',
        username: '',
        email: '',
        password: '',
        dob: new Date(),
        isAcceptPolicy: false,
      }}
      validate={registerValidation}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false);

          const data = await dispatch(registerUser(values));

          enqueueSnackbar(data.msg, {
            variant: data.success ? 'success' : 'error',
          });
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name='fullName'
            label='Full Name'
            variant='outlined'
            margin='dense'
            fullWidth
            focused
          />
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
  );
};

export default RegisterForm;
