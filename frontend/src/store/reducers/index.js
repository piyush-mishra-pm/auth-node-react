import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
});
