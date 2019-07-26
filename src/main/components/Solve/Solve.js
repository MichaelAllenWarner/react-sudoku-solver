import React from 'react';
import PropTypes from 'prop-types';

const Solve = ({ solve, status, solveButtonRef }) => (
  <button
    onClick={solve}
    disabled={status !== 'ready'}
    ref={solveButtonRef}
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