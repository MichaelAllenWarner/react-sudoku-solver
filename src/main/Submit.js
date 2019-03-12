import React from 'react';
import PropTypes from 'prop-types';

const Submit = props => (
  <button
    id="submit"
    onClick={props.solve}
    disabled={props.status !== 'ready'}
  >
    Submit
  </button>
);

Submit.propTypes = {
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Submit };