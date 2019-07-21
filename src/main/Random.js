import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Random extends Component {
  handleClick = () => {
    this.props.clearBoard();
    fetch('/api/puzzles')
      .then(res => res.json())
      .then(data => {
        const newBoard = data.board.split('');
        this.props.replaceBoardArray(newBoard);
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        disabled={this.props.status === 'solving'}  
      >
        Random Puzzle
      </button>
    );
  }
}

Random.propTypes = {
  clearBoard: PropTypes.func.isRequired,
  replaceBoardArray: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Random };