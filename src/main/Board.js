import React from 'react';
import PropTypes from 'prop-types';
import { Row } from './Row';

const cellInputRefs = Array.from({ length: 81 }, () => React.createRef());

const Board = props => {
  const rows = Array.from({ length: 9 }, (_el, ind) =>
    <Row {...props}
      key={ind.toString()}
      rowNum={ind}
      cellInputRefs={cellInputRefs}
    />
  );

  return <table>{rows}</table>;
};

Board.propTypes = {
  status: PropTypes.string.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  solve: PropTypes.func.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Board };