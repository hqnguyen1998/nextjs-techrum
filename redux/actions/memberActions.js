import * as t from '../reducer/member/memberTypes';

export const fetchMemberProfile = (profile) => (dispatch) => {
  dispatch({
    type: t.FETCH_USER_PROFILE_INGROGRESS,
  });

  dispatch({
    type: t.FETCH_USER_PROFILE_SUCCESS,
    payload: profile,
  });
};
