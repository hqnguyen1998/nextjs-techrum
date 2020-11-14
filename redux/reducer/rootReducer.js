import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import config from './config/configReducer';
import member from './member/memberReducer';

const rootReducer = combineReducers({
  auth: auth,
  member: member,
  config: config,
});

export default rootReducer;
