/*
 * Auth actions
 */
import {
  LOG_IN_SUCCESS,
  LOG_OUT,
  LOG_IN_LOADING,
  LOG_IN_FAILED
} from '../actions/auth';

let defaultState = {
  username: "",
  role: "",
  token: "",
  loggedIn: false,
  isLoading: false,
  hasErrored: false
};

let user = JSON.parse(localStorage.getItem('user'));

let initialState = user ? {...defaultState, ...user, loggedIn: true} : defaultState

const auth = (state = initialState, action)  => {
  switch (action.type) {
    case LOG_IN_LOADING:
      return {
        ...defaultState,
        isLoading: true
      }
    case LOG_IN_FAILED:
      return {
        ...defaultState,
        hasErrored: true
      }
    case LOG_IN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...defaultState,
        isLoading: false,
        hasErrored: false,
        ...action.user,
        loggedIn: true

      }
    case LOG_OUT:
      localStorage.removeItem('user');
      return {
        ...defaultState
      }
    default:
      return state;
  }
}

export default auth;