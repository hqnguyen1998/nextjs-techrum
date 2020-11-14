import * as t from './memberTypes';

const initialState = {
  profile: null,
  isLoading: true,
};

const memeberReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case t.FETCH_USER_PROFILE_INGROGRESS:
      return {
        ...state,
        isLoading: true,
        profile: null,
      };
    case t.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case t.FETCH_USER_PROFILE_FAILED:
      return {
        ...state,
        profile: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default memeberReducer;
