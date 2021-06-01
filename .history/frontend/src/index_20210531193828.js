// React packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// Styles
import './bootstrap.min.css'
import './index.css';
// High level Components
import App from './App';
// Store
import store from './store.js'



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
