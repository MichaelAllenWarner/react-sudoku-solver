// needed for React to support legacy browsers
import 'core-js/es/map';
import 'core-js/es/set';

// needed for Fetch API in legacy browsers
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);