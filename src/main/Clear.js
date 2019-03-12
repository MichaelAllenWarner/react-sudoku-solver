import React from 'react';
import PropTypes from 'prop-types';

const Clear = props => (
  <button
    id="clear"
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