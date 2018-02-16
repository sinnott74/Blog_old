import React from 'react';
import ReactDOM from 'react-dom';
import store, { history } from './redux/store';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from './components/App';
import 'react-md/dist/react-md.blue-red.min.css';

// UI components to bundle centrally instead of within each page chunk
import 'react-md/lib/Buttons/Button';
import 'react-md/lib/TextFields/TextField';
import 'react-md/lib/Pickers/DatePicker';

ReactDOM.render(
  <Provider store= {store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);