import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux'
import thunk from "redux-thunk";
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import App from './components/App';
import 'react-md/dist/react-md.blue-red.min.css';

// UI components to bundle centrally instead of within each page chunk
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields/TextField';
import DatePicker from 'react-md/lib/Pickers/DatePicker';

const history = createHistory();
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

ReactDOM.render(
  <Provider store= {store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);