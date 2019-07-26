import React from 'react';
import PropTypes from 'prop-types';

const Random = ({ clear, replaceBoard, status }) => {
  const handleClick = () => {
    clear();
    fetch('/api/puzzles')
      .then(res => res.json())
      .then(data => {
        const newBoard = data.board.split('');
        replaceBoard(newBoard);
      })
      .catch(err => alert(err));
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === 'solving'}  
    >
      Random Puzzle
    </button>
  );
};

Random.propTypes = {
  clear: PropTypes.func.isRequired,
  replaceBoard: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

export { Random };