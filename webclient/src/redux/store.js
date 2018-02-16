import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer';

export const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(middleware, thunk)
);

const store = createStore(
  rootReducer,
  enhancer
);

export default store;