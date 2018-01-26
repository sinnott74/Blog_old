import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'
import blog from './blog';
import ui from './ui';
import auth from './auth';

const rootReducer = combineReducers({
  ui,
  router,
  blog,
  auth
});

export default rootReducer;