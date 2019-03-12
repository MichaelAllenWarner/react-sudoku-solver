import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CellInput } from './CellInput';

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.status !== this.props.status
      || nextProps.boardVal !== this.props.boardVal
      || nextProps.solutionVal !== this.props.solutionVal
    ) {
      return true;
    }
    return false;
  }

  render() {
    const rowRemThree = this.props.rowNum % 3;
    const colRemThree = this.props.colNum % 3;
    const rowClass = (rowRemThree === 0) ? 'top' : (rowRemThree === 2) ? 'bottom' : '';
    const colClass = (colRemThree === 0) ? 'left' : (colRemThree === 2) ? 'right' : '';
  
    return (
      <td className={`${rowClass} ${colClass}`}>
        <CellInput
          cellNum={this.props.cellNum}
          cellInputRefs={this.props.cellInputRefs}
          solve={this.props.solve}
          updateBoardArray={this.props.updateBoardArray}
          boardVal={this.props.boardVal}
          solutionVal={this.props.solutionVal}
          status={this.props.status}
        />
      </td>
    );
  }
}

Cell.propTypes = {
  status: PropTypes.string.isRequired,
  boardVal: PropTypes.string.isRequired,
  solutionVal: PropTypes.string.isRequired,
  rowNum: PropTypes.number.isRequired,
  colNum: PropTypes.number.isRequired,
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solve: PropTypes.func.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Cell };