/*
 * Sidenav actions
 */
import { OPEN_SIDENAV, CLOSE_SIDENAV, TOGGLE_SIDENAV } from '../../actions/sidenav';

 let initialState = {
   opened : false
 }

 const sidenav = (state = initialState, action)  => {
  switch (action.type) {
    case OPEN_SIDENAV:
      return {
        ...state,
        opened: true
      }
    case CLOSE_SIDENAV:
      return {
        ...state,
        opened: false
      }
    case TOGGLE_SIDENAV:
      return {
        ...state,
        opened: !state.opened
      }
    default:
      return state;
  }
}

export default sidenav;