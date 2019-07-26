import React from 'react';
import PropTypes from 'prop-types';

const Clear = ({ clear, status }) => (
  <button
    onClick={clear}
    disabled={status === 'solving'}  
  >
    Clear
  </button>
);

Clear.propTypes = {
  clear: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Clear };