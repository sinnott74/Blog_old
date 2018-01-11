export const OPEN_SIDENAV = 'OPEN_SIDENAV';
export const CLOSE_SIDENAV = 'CLOSE_SIDENAV';
export const TOGGLE_SIDENAV = 'TOGGLE_SIDENAV';

export function openSideNav(){
  return {
    type: OPEN_SIDENAV
  }
}

export function closeSideNav(){
  return {
    type: CLOSE_SIDENAV
  }
}

export function toggleSideNav(){
  return {
    type: TOGGLE_SIDENAV
  }
}