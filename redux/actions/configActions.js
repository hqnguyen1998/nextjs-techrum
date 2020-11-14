import * as t from '../reducer/config/configTypes';

export const setPageTheme = (value) => (dispatch) => {
  dispatch({
    type: t.SET_PAGE_THEME,
    payload: value,
  });
};

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
