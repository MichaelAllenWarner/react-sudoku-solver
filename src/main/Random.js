import React from 'react';
import PropTypes from 'prop-types';

const Random = props => {
  const handleClick = () => {
    props.clearBoard();
    fetch('/api/puzzles')
      .then(res => res.json())
      .then(data => {
        const newBoard = data.board.split('');
        props.replaceBoardArray(newBoard);
      })
      .catch(err => alert(err));
  };

  return (
    <button
      onClick={handleClick}
      disabled={props.status === 'solving'}  
    >
      Random Puzzle
    </button>
  );
};

Random.propTypes = {
  clearBoard: PropTypes.func.isRequired,
  replaceBoardArray: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Random };