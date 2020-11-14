import * as t from './authTypes';

const initialState = {
  token: null,
  isAuth: false,
  isLoading: true,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case t.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case t.AUTH_USER:
      return {
        ...state,
        token: payload.token,
        isAuth: payload.success,
        isLoading: false,
        user: payload.data,
        error: {
          msg: 'Login Success',
          success: true,
        },
      };
    case t.REGISTER_SUCCESS:
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuth: payload.success,
        isLoading: false,
        user: payload.data,
        error: {
          msg: payload.msg,
          success: payload.success,
        },
      };
    case t.REGISTER_FAILED:
    case t.AUTH_USER_FAILED:
    case t.LOGIN_FAILED:
    case t.SIGN_OUT:
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
