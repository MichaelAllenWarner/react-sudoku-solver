import React from 'react';
import PropTypes from 'prop-types';

const Solve = props => (
  <button
    onClick={props.solve}
    disabled={props.status !== 'ready'}
    ref={props.solveButtonRef}
  >
    Solve
  </button>
);

Solve.propTypes = {
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  solveButtonRef: PropTypes.object.isRequired
};

export { Solve };