import React, { Component } from 'react';
import { CellForm } from './CellForm';

export class Cell extends Component {
  cellNum = (this.props.rowNum * 9) + this.props.colNum;

  shouldComponentUpdate(nextProps) {
    if (nextProps.boardArray[this.cellNum] !== this.props.boardArray[this.cellNum]) {
      return true;
    }
    if (nextProps.solutionArray[this.cellNum] !== this.props.solutionArray[this.cellNum]) {
      return true;
    }
    if (nextProps.status !== this.props.status) {
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
        <CellForm
          cellNum={this.cellNum}
          cellInputRefs={this.props.cellInputRefs}
          solve={this.props.solve}
          updateBoardArray={this.props.updateBoardArray}
          boardArray={this.props.boardArray}
          solutionArray={this.props.solutionArray}
          status={this.props.status}
        />
      </td>
    );
  }
}