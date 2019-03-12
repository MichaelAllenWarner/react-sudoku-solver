import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from './Cell';

const Row = props => {
  const cells = Array.from({ length: 9 }, (_el, ind) =>
    <Cell
      key={ind.toString()}
      rowNum={props.rowNum}
      colNum={ind}
      cellNum={(props.rowNum * 9) + ind}
      cellInputRefs={props.cellInputRefs}
      solve={props.solve}
      updateBoardArray={props.updateBoardArray}
      boardVal={props.boardArray[(props.rowNum * 9) + ind]}
      solutionVal={props.solutionArray[(props.rowNum * 9) + ind].toString()}
      status={props.status}
    />
  );
  return <tr>{cells}</tr>;
};

Row.propTypes = {
  status: PropTypes.string.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  rowNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solve: PropTypes.func.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Row };