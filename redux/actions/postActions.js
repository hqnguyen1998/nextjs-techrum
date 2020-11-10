import * as t from '../reducer/post/postTypes';

export const fetchPosts = (data) => (dispatch) => {
  dispatch({
    type: t.FETCH_POSTS_INGROGRESS,
  });

  if (!data) {
    return dispatch({
      type: t.FETCH_POSTS_FAILED,
    });
  }

  return dispatch({
    type: t.FETCH_POSTS_SUCCESS,
    payload: data,
  });
};
