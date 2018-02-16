/*
 * Sidenav actions
 */
const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

/**
 * Reducer
 */
 let initialState = {
   showing : false,
   message: ""
 }

 export default function reducer(state = initialState, action) {
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

/**
 * Action Creators
 */
const defaultDuration = 3000;
export function showToast(message, duration){
  let toastDuration = duration || defaultDuration;
  return function(dispatch) {
    dispatch(displayToastMessage(message));
    setTimeout(() => dispatch(hideToast()), toastDuration);
  }
}

export function hideToast(){
  return {
    type: HIDE_TOAST
  }
}

function displayToastMessage(message) {
  return {
    type: SHOW_TOAST,
    message
  }
}