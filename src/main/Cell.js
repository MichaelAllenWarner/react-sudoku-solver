import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
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
        if (this.props.status === 'solving') {
          return;
        }
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

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.status !== this.props.status
      || nextProps.boardVal !== this.props.boardVal
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
 
    const value = (this.props.status === 'solved')
      ? this.props.solutionVal
      : (this.props.boardVal === '0' ? '' : this.props.boardVal);

    const valueWasGeneratedBySolver = (
      this.props.status === 'solved'
      && (this.props.solutionVal !== this.props.boardVal)
    );
    
    const isReadOnly = (
      this.props.status === 'solved'
      || this.props.status === 'invalid'
      || this.props.status === 'solving'
    );

    return (
      <td className={`${rowClass} ${colClass}`}>
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