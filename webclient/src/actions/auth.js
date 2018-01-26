import { showToast } from './toast';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_LOADING = 'LOG_IN_LOADING';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';

function logUserOut() {
  return {
    type: LOG_OUT
  }
}

function loginLoading(bool) {
  return {
    type: LOG_IN_LOADING,
    isLoading: bool
  }
}

function loginFailed() {
  return {
    type: LOG_IN_FAILED
  }
}

function loginSuccess(credentials){
  return {
    type: LOG_IN_SUCCESS,
    user: credentials
  }
}

export function login(username, password) {
  return function(dispatch) {

    dispatch(loginLoading(true));
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(loginLoading(false));
      return response;
    })
    .then((response) => response.json())
    .then((credentials) => dispatch(loginSuccess(credentials)))
    .then(() => dispatch(showToast('Log In Successful')))
    .catch((err) => {
      console.log(err);
      dispatch(loginFailed())
      dispatch(showToast('Log In Failed'))
    })
  }
}

export function signUp(user){
  return function(dispatch) {

    dispatch(loginLoading(true));
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(loginLoading(false));
      return response;
    })
    .then((response) => response.json())
    .then((credentials) => dispatch(loginSuccess(credentials)))
    .then(() => dispatch(showToast('Sign Up Successful')))
    .catch((err) => {
      console.log(err);
      dispatch(loginFailed())
      dispatch(showToast('Sign Up Failed'))
    })
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(logUserOut());
    dispatch(showToast('Log Out Successful'));
  }
}