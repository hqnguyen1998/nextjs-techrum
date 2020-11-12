import * as t from '../reducer/config/configTypes';

export const fetchPageConfig = (data) => async (dispatch) => {
  if (!data) {
    return dispatch({
      type: t.FETCH_PAGE_CONFIG_FAILED,
    });
  }

  dispatch({
    type: t.FETCH_PAGE_CONFIG_SUCCESS,
    payload: data,
  });
};
