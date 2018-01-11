import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import blog from './blog';
import ui from './ui';

const rootReducer = combineReducers({
  ui,
  router: routerReducer,
  blog
});

export default rootReducer;