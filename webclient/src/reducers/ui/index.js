import { combineReducers } from 'redux';
import sidenav from './sidenav';
import optionsMenu from './optionsMenu';
import toast from './toast';

const uiReducer = combineReducers({
  sidenav,
  optionsMenu,
  toast
});

export default uiReducer;