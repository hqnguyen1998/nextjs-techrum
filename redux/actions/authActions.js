import * as t from '../reducer/auth/authTypes';
import fetch from 'isomorphic-unfetch';
import Cookie from 'js-cookie';

export const authUser = (data) => async (dispatch) => {
  if (!data.success) {
    return dispatch({
      type: t.AUTH_USER_FAILED,
      payload: data,
    });
  } else {
    return dispatch({
      type: t.AUTH_USER,
      payload: data,
    });
  }
};

export const loginUser = (data) => async (dispatch) => {
  if (!data.success) {
    Cookie.remove('token');

    return dispatch({
      type: t.LOGIN_FAILED,
      payload: data,
    });
  } else {
    Cookie.set('token', data.token);

    dispatch({
      type: t.LOGIN_SUCCESS,
      payload: data,
    });
  }
};

export const registerUser = (data) => async (dispatch) => {
  if (!data.success) {
    Cookie.remove('token');

    return dispatch({
      type: t.REGISTER_FAILED,
      payload: data,
    });
  } else {
    // Set Cookie
    Cookie.set('token', data.token);

    dispatch({
      type: t.REGISTER_SUCCESS,
      payload: data,
    });
  }
};

export const signOut = () => (dispatch) => {
  Cookie.remove('token');

  dispatch({
    type: t.SIGN_OUT,
  });
};
