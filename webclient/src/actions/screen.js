export const SMALL_SCREEN = 'SMALL_SCREEN';
export const LARGE_SCREEN = 'LARGE_SCREEN';

export function largeScreen() {
  return {
    type: LARGE_SCREEN,
  }
}

export function smallScreen() {
  return {
    type: SMALL_SCREEN
  }
}
