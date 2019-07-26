// needed for React to support legacy browsers
import 'core-js/es/map';
import 'core-js/es/set';

// needed for fetch / promise in legacy browsers
import 'promise-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);