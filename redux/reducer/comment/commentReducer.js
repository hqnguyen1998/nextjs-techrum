import * as t from './commentTypes';

const initialState = {
  comments: [],
  isLoading: true,
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case t.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, payload],
        isLoading: false,
      };
    case t.FETCH_POST_COMMENTS_INGROGRESS:
      return {
        ...state,
        comments: [],
        isLoading: true,
      };
    case t.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        isLoading: false,
      };
    case t.FETCH_POST_COMMENTS_FAILED:
      return {
        ...state,
        comments: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
