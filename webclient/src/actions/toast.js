export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

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
