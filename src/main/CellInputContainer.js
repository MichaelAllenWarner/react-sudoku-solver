import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CellInput } from './CellInput';

class CellInputContainer extends Component {
  handleFocus = () => {
    this.props.cellInputRefs[this.props.cellNum].current.select();
  };

  handleInput = event => {
    const inputIsGood = (
      // check ValidityState b/c checking value isn't enough for <input type="number">
      event.target.validity.valid
      && Number.isInteger(+event.target.value)
      && +event.target.value >= 1
      && +event.target.value <= 9
    );

    if (inputIsGood) {
      const formattedVal = event.target.value.trim().slice(0, 1);
      this.props.updateBoardArray(this.props.cellNum, formattedVal);
 
      // focus on next cell after good input
      const nextCellNum = (this.props.cellNum === 80) ? 0 : this.props.cellNum + 1;
      this.props.cellInputRefs[nextCellNum].current.focus();
    }
    
    else {
      this.props.updateBoardArray(this.props.cellNum, '0');

      // clear DOM value property (not enough to clear HTML value attribute b/c type="number")
      this.props.cellInputRefs[this.props.cellNum].current.value = '';
    }
  };

  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        event.preventDefault(); // otherwise focus() doesn't work
        const nextCellNum = (this.props.cellNum === 80)
          ? 0
          : this.props.cellNum + 1;
        this.props.cellInputRefs[nextCellNum].current.focus();
        break;
      }

      case 'ArrowLeft':
      case 'Left': {
        event.preventDefault(); // otherwise focus() doesn't work
        const prevCellNum = (this.props.cellNum === 0)
          ? 80
          : this.props.cellNum - 1;
        this.props.cellInputRefs[prevCellNum].current.focus();
        break;
      }

      case 'ArrowUp':
      case 'Up': {
        event.preventDefault(); // otherwise browser increments number
        const aboveCellNum = (this.props.cellNum <= 8)
          ? this.props.cellNum + 72
          : this.props.cellNum - 9;
        this.props.cellInputRefs[aboveCellNum].current.focus();
        break;
      }

      case 'ArrowDown':
      case 'Down': {
        event.preventDefault(); // otherwise browser decrements number
        const belowCellNum = (this.props.cellNum >= 72)
          ? this.props.cellNum - 72
          : this.props.cellNum + 9;
        this.props.cellInputRefs[belowCellNum].current.focus();
        break;
      }

      case 'Enter': {
        this.props.solve();
        break;
      }
    }
  };

  handleKeyUp = event => {
    // backspace gets keyUp so that it deletes before focusing on prevCell
    if (event.key === 'Backspace') {
      const prevCellNum = (this.props.cellNum === 0) ? 80 : this.props.cellNum - 1;
      this.props.cellInputRefs[prevCellNum].current.focus();
    }
  };

  render() {
    const solutionVal = this.props.solutionArray[this.props.cellNum].toString();
    const boardVal = this.props.boardArray[this.props.cellNum];

    const value = (this.props.status === 'solved')
      ? solutionVal
      : (boardVal === '0' ? '' : boardVal);

    const className = ((this.props.status === 'solved') && (solutionVal !== boardVal))
      ? 'manualInput generated'
      : 'manualInput';
    
    const isReadOnly = (this.props.status === 'solved' || this.props.status === 'invalid');

    return (
      <CellInput
        value={value}
        className={className}
        isReadOnly={isReadOnly}
        cellNum={this.props.cellNum}
        cellInputRefs={this.props.cellInputRefs}
        handleFocus={this.handleFocus}
        handleInput={this.handleInput}
        handleKeyDown={this.handleKeyDown}
        handleKeyUp={this.handleKeyUp}
      />
    );
  }
}

CellInputContainer.propTypes = {
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateBoardArray: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  solutionArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired
};

export { CellInputContainer };