import React from 'react';
import PropTypes from 'prop-types';

const Solution = ({ status, solution }) => {
  const value = (status === 'solved')
    ? solution.join('')
    : (status === 'invalid')
      ? 'Invalid puzzle.'
      : (status === 'solving')
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
  solution: PropTypes.arrayOf(PropTypes.number).isRequired
};

export { Solution };