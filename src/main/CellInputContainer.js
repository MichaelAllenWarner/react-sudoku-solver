import React, { Component } from 'react';
import { CellInput } from './CellInput';

export class CellInputContainer extends Component {
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
 
      // reset containing form b/c clearing value doesn't work for <input type="number">
      this.props.formReset();

      // re-focus to avoid problems that can arise when DOM "value" !== component "value"
      this.props.cellInputRefs[this.props.cellNum].current.blur();
      this.props.cellInputRefs[this.props.cellNum].current.focus();
    }
  };

  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        // event.preventDefault();
        const nextCellNum = (this.props.cellNum === 80) ? 0 : this.props.cellNum + 1;
        this.props.cellInputRefs[nextCellNum].current.focus();
        break;
      }

      case 'ArrowLeft':
      case 'Left': {
        // event.preventDefault();
        const prevCellNum = (this.props.cellNum === 0) ? 80 : this.props.cellNum - 1;
        this.props.cellInputRefs[prevCellNum].current.focus();
        break;
      }

      case 'ArrowUp':
      case 'Up': {
        event.preventDefault(); // otherwise browser increments number

        // if (row !== 0) {
        //   focusOnCell(row - 1, col);
        // } else {
        //   focusOnCell(8, col);
        // }
        break;
      }

      case 'ArrowDown':
      case 'Down': {
        event.preventDefault(); // otherwise browser decrements number

        // if (row !== 8) {
        //   focusOnCell(row + 1, col);
        // } else {
        //   focusOnCell(0, col);
        // }
        break;
      }

      case 'Enter': {
        event.preventDefault(); // otherwise form submits / page reloads
        this.props.solve();
        break;
      }
    }
  };

  handleKeyUp = event => {
    // backspace gets keyUp so that it deletes before focusing
    if (event.key === 'Backspace') {
      const prevCellNum = (this.props.cellNum === 0) ? 80 : this.props.cellNum - 1;
      this.props.cellInputRefs[prevCellNum].current.focus();
    }
  };

  render() {
    const solutionVal = this.props.solutionArray[this.props.cellNum];
    const boardVal = this.props.boardArray[this.props.cellNum];

    const value = (this.props.status === 'solved')
      ? solutionVal
      : ( 
        boardVal === '0'
          ? ''
          : boardVal
      );

    const className = ((this.props.status === 'solved') && (solutionVal !== +boardVal))
      ? 'manualInput generated'
      : 'manualInput';
    
    const isReadOnly = (this.props.status === 'solved' || this.props.status === 'invalid');

    return (
      <CellInput
        value={value}
        className={className}
        isReadOnly={isReadOnly}
        rowNum={this.props.rowNum}
        colNum={this.props.colNum}
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