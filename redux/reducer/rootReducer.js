import { combineReducers } from 'redux';
import auth from './auth/authReducer';

const rootReducer = combineReducers({
  auth: auth,
});

export default rootReducer;
