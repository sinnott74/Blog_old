/*
 * Sidenav actions
 */
import { SHOW_TOAST, HIDE_TOAST } from '../../actions/toast';

 let initialState = {
   showing : false,
   message: ""
 }

 const toast = (state = initialState, action)  => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        showing: true,
        message: action.message
      }
    case HIDE_TOAST:
      return {
        ...state,
        showing: false,
        message: ""
      }
    default:
      return state;
  }
}

export default toast;