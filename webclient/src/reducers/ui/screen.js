/*
 * Sidenav actions
 */
import { SMALL_SCREEN, LARGE_SCREEN } from '../../actions/screen';

 let initialState = {
  large : false
 }

 const screen = (state = initialState, action)  => {
  switch (action.type) {
    case SMALL_SCREEN:
      return {
        ...state,
        large: false
      }
    case LARGE_SCREEN:
      return {
        ...state,
        large: true
      }
    default:
      return state;
  }
}

export default screen;