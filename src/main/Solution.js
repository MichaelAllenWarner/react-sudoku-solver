import React, { Component } from 'react';

export class Solution extends Component {
  render() {
    const value = (this.props.status === 'solved')
      ? this.props.solutionArray.join('')
      : (this.props.status === 'invalid')
        ? 'Invalid puzzle.'
        : (this.props.status === 'solving')
          ? 'Solving ...'
          : 'Solution string will appear here.';
    return (
      <div>
        <input
          id="solution"
          value={value}
          readOnly={true}
        />
      </div>
    );
  }
}