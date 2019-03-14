import React from 'react';
import PropTypes from 'prop-types';

const Solution = props => {
  const value = (props.status === 'solved')
    ? props.solutionArray.join('')
    : (props.status === 'invalid')
      ? 'Invalid puzzle.'
      : (props.status === 'solving')
        ? 'Solving ...'
        : '';

  return (
    <div>
      <input
        id="solution"
        placeholder="Solution string will appear here."
        value={value}
        readOnly={true}
      />
    </div>
  );
};

Solution.propTypes = {
  status: PropTypes.string.isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired
};

export { Solution };