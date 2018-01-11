export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export function showToast(message){
  return {
    type: SHOW_TOAST,
    message
  }
}

export function hideToast(){
  return {
    type: HIDE_TOAST
  }
}
