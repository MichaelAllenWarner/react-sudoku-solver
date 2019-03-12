import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Solution extends Component {
  render() {
    const value = (this.props.status === 'solved')
      ? this.props.solutionArray.join('')
      : (this.props.status === 'invalid')
        ? 'Invalid puzzle.'
        : (this.props.status === 'solving')
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
  }
}

Solution.propTypes = {
  status: PropTypes.string.isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired
};

export { Solution };