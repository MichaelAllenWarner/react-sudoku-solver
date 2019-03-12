import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CellInput extends Component {
  handleFocus = () => {
    this.props.cellInputRefs[this.props.cellNum].current.select();
  };

  handleKeyUp = event => {
    // backspace gets keyUp so that it deletes before focusing on prevCell
    if (event.key === 'Backspace') {
      const prevCellNum = (this.props.cellNum === 0) ? 80 : this.props.cellNum - 1;
      this.props.cellInputRefs[prevCellNum].current.focus();
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
      if (this.props.boardVal !== formattedVal) {
        this.props.updateBoardArray(this.props.cellNum, formattedVal);
      }
 
      // focus on next cell after good input
      const nextCellNum = (this.props.cellNum === 80) ? 0 : this.props.cellNum + 1;
      this.props.cellInputRefs[nextCellNum].current.focus();
    }
    
    else {
      if (this.props.boardVal !== '0') {
        this.props.updateBoardArray(this.props.cellNum, '0');
      }
      // clear DOM value property (not enough to clear HTML value attribute b/c type="number")
      this.props.cellInputRefs[this.props.cellNum].current.value = '';
    }
  };

  render() {
    const value = (this.props.status === 'solved')
      ? this.props.solutionVal
      : (this.props.boardVal === '0' ? '' : this.props.boardVal);

    const valueWasGeneratedBySolver = (
      this.props.status === 'solved'
      && (this.props.solutionVal !== this.props.boardVal)
    );
    
    const isReadOnly = (
      this.props.status === 'solving'
      || this.props.status === 'solved'
      || this.props.status === 'invalid'
    );

    return (
      <input
        value={value}
        className={valueWasGeneratedBySolver ? 'manualInput generated' : 'manualInput'}
        onInput={this.handleInput}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        ref={this.props.cellInputRefs[this.props.cellNum]}
        readOnly={isReadOnly}
        type="number"
        min="1"
        max="9"
      />
    );
  }
}

CellInput.propTypes = {
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateBoardArray: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  solutionVal: PropTypes.string.isRequired,
  boardVal: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export { CellInput };