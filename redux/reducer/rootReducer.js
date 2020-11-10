import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import post from './post/postReducer';

const rootReducer = combineReducers({
  auth: auth,
  post: post,
});

export default rootReducer;
