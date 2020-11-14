import { fetcher } from '../../src/api-fetcher';
import * as t from '../reducer/auth/authTypes';
import { API_USER_ROUTE } from '../../config/config.json';
import Cookie from 'js-cookie';

export const updateUser = ({ token, data }) => async (dispatch) => {
  const response = await fetcher(`${process.env.API_URI}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!response.success) {
    dispatch({
      type: t.UPDATE_USER_UNSUCCESS,
    });
  }

  dispatch({
    type: t.UPDATE_USER_SUCCESS,
    payload: response.data,
  });

  return response;
};

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
  const response = await fetcher(`${process.env.API_URI}${API_USER_ROUTE}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.success) {
    Cookie.remove('token');

    dispatch({
      type: t.REGISTER_FAILED,
      payload: response,
    });

    return response;
  }

  Cookie.set('token', response.token);

  dispatch({
    type: t.REGISTER_SUCCESS,
    payload: response,
  });

  return response;
};

export const signOut = () => (dispatch) => {
  Cookie.remove('token');

  dispatch({
    type: t.SIGN_OUT,
  });
};
