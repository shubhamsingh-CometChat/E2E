import { combineReducers } from 'redux';
import UserDetail from './Userdetail';

import Login from './login';
import E2E from './E2E';
export default combineReducers({
  UserDetail,
  Login,
  E2E,
});
