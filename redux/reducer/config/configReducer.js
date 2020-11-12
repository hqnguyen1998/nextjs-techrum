import * as t from './configTypes';

const initialState = {
  config: null,
  isLoading: true,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_PAGE_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.payload[0],
        isLoading: false,
      };
    case t.FETCH_PAGE_CONFIG_FAILED:
      return {
        ...state,
        config: {},
        isLoading: false,
      };
    default:
      return state;
  }
};

export default configReducer;
