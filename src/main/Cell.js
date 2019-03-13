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
    const rowClassHelper = Math.floor(this.props.cellNum / 9) % 3;
    const colClassHelper = this.props.cellNum % 3;

    const rowClass = (rowClassHelper === 0) ? 'top' : (rowClassHelper === 2) ? 'bottom' : '';
    const colClass = (colClassHelper === 0) ? 'left' : (colClassHelper === 2) ? 'right' : '';
  
    return (
      <td className={`${rowClass} ${colClass}`}>
        <CellInput {...this.props}/>
      </td>
    );
  }
}

Cell.propTypes = {
  status: PropTypes.string.isRequired,
  boardVal: PropTypes.string.isRequired,
  solutionVal: PropTypes.string.isRequired,
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solve: PropTypes.func.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Cell };