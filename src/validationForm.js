export const registerValidation = (values) => {
  const error = {};

  if (!values.username) {
    error.username = 'Required';
  } else if (!/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(values.username)) {
    error.username = 'Invalid Username';
  } else if (
    values.username === 'admin' ||
    values.username === 'administrator'
  ) {
    error.username = 'Invalid Username';
  }

  if (!values.email) {
    error.email = 'Required';
  } else if (
    //eslint-disable-next-line
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    error.email = 'Invalid Email';
  }

  if (!values.password) {
    error.password = 'Required';
  } else if (
    !/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
      values.password
    )
  ) {
    error.password =
      'Password must contains at least 1 digit, 1 lowercase, 1 uppercase, 1 special character, and more than 8 characters';
  }

  if (values.isAcceptPolicy === false) {
    error.isAcceptPolicy = 'Required';
  }

  return error;
};
