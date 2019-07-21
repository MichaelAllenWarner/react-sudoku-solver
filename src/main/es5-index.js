// needed for React to support IE10 / IE11
import 'core-js/es/map';
import 'core-js/es/set';

// needed for fetch / promise (to get random boards from db):
import 'promise-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App.js';

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);