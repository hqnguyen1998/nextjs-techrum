import fetch from 'isomorphic-unfetch';
import * as t from '../reducer/comment/commentTypes';

export const addCommentInPost = (data) => (dispatch) => {
  dispatch({
    type: t.ADD_COMMENT_SUCCESS,
    payload: data,
  });
};

export const fetchPostComments = (pid) => async (dispatch) => {
  dispatch({
    type: t.FETCH_POST_COMMENTS_INGROGRESS,
  });

  const response = await fetch(`${process.env.API_URI}/api/comment?pid=${pid}`);

  const data = await response.json();

  if (!data.success) {
    return dispatch({
      type: t.FETCH_POST_COMMENTS_FAILED,
    });
  }

  dispatch({
    type: t.FETCH_POST_COMMENTS_SUCCESS,
    payload: data.data,
  });
};
