import { combineReducers } from 'redux';
import sidenav from './sidenav';
import optionsMenu from './optionsMenu';
import toast from './toast';
import screen from './screen';

const uiReducer = combineReducers({
  sidenav,
  optionsMenu,
  toast,
  screen
});

export default uiReducer;