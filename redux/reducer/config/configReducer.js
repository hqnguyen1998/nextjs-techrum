import * as t from './configTypes';

const initialState = {
  config: null,
  theme: 'dark',
  isLoading: true,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_PAGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
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
