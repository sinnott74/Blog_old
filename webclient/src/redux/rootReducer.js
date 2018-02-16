import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux'
import ui from './modules/ui';
import blog from './modules/blog';
import auth from './modules/auth';

const rootReducer = combineReducers({
  ui,
  router,
  blog,
  auth
});

export default rootReducer;