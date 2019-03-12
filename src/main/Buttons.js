import React from 'react';
import PropTypes from 'prop-types';
import { Submit } from './Submit';
import { Clear } from './Clear';

const Buttons = props => (
  <div id="buttons">
    <Submit
      solve={props.solve}
      status={props.status}
    />
    <Clear
      clearBoard={props.clearBoard}
      status={props.status}
    />
  </div>
);

Buttons.propTypes = {
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  clearBoard: PropTypes.func.isRequired
};

export { Buttons };