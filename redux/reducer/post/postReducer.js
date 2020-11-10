import * as t from './postTypes';

const initialState = {
  posts: null,
  isLoading: true,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case t.FETCH_POSTS_INGROGRESS:
      return {
        ...state,
        posts: [],
        isLoading: true,
      };
    case t.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    case t.FETCH_POSTS_FAILED:
      return {
        ...state,
        posts: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
