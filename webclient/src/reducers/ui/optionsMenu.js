/*
 * Sidenav actions
 */
import { OPEN_OPTIONS_MENU, CLOSE_OPTIONS_MENU, TOGGLE_OPTIONS_MENU } from '../../actions/optionsMenu';

 let initialState = {
   opened : false
 }

 const optionsMenu = (state = initialState, action)  => {
  switch (action.type) {
    case OPEN_OPTIONS_MENU:
      return {
        ...state,
        opened: true
      }
    case CLOSE_OPTIONS_MENU:
      return {
        ...state,
        opened: false
      }
    case TOGGLE_OPTIONS_MENU:
      return {
        ...state,
        opened: !state.opened
      }
    default:
      return state;
  }
}

export default optionsMenu;