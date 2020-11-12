import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import config from './config/configReducer';

const rootReducer = combineReducers({
  auth: auth,
  config: config,
});

export default rootReducer;
