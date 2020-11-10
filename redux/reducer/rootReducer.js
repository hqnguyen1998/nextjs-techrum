import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import comment from './comment/commentReducer';

const rootReducer = combineReducers({
  auth: auth,
  comment: comment,
});

export default rootReducer;
