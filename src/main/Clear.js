import React from 'react';
import PropTypes from 'prop-types';

const Clear = props => (
  <button
    onClick={props.clearBoard}
    disabled={props.status === 'solving'}  
  >
    Clear
  </button>
);

Clear.propTypes = {
  clearBoard: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Clear };