import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from './Cell';

class Row extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      (nextProps.status !== this.props.status && nextProps.status !== 'solving')
      || nextProps.boardArray.some((el, ind) =>
        Math.floor(ind / 9) === this.props.rowNum
        && el !== this.props.boardArray[ind])
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { rowNum, boardArray, solutionArray, ...otherProps } = this.props;  
    const cells = Array.from({ length: 9 }, (_el, ind) =>
      <Cell
        key={ind.toString()}
        cellNum={(rowNum * 9) + ind}
        boardVal={boardArray[(rowNum * 9) + ind]}
        solutionVal={solutionArray[(rowNum * 9) + ind].toString()}
        {...otherProps}
      />
    );

    return <tr>{cells}</tr>;
  }
}

Row.propTypes = {
  rowNum: PropTypes.number.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.string.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solve: PropTypes.func.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Row };