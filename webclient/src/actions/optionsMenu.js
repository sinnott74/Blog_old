export const OPEN_OPTIONS_MENU = 'OPEN_OPTIONS_MENU';
export const CLOSE_OPTIONS_MENU = 'CLOSE_OPTIONS_MENU';
export const TOGGLE_OPTIONS_MENU = 'TOGGLE_OPTIONS_MENU';

export function openOptionsMenu(){
  return {
    type: OPEN_OPTIONS_MENU
  }
}

export function closeOptionsMenu(){
  return {
    type: CLOSE_OPTIONS_MENU
  }
}

export function toggleOptionsMenu(){
  return {
    type: TOGGLE_OPTIONS_MENU
  }
}