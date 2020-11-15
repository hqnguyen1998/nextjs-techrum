import { fetcher } from '../../src/api-fetcher';
import * as t from '../reducer/member/memberTypes';
import { API_USER_ROUTE } from '../../config/config.json';

export const fetchMemberProfile = (id) => async (dispatch) => {
  dispatch({
    type: t.FETCH_USER_PROFILE_INGROGRESS,
  });

  const response = await fetcher(
    `${process.env.API_URI}${API_USER_ROUTE}/${id}`
  );

  dispatch({
    type: t.FETCH_USER_PROFILE_SUCCESS,
    payload: response.data,
  });

  return response;
};
