import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  focusOn,
  validateInput,
  determineCellClass
} from './Cell-helpers';

class Cell extends Component {
  focusOn = focusOn.bind(this);

  handleFocus = () => {
    this.props.cellInputRefs[this.props.cellNum].current.select();
  };

  handleKeyUp = event => {
    // backspace gets keyUp so that it deletes before focusing on prev cell
    if (event.key === 'Backspace') {
      this.focusOn('prev');
    }
  };

  handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        event.preventDefault(); // otherwise focus() doesn't work
        this.focusOn('next');
        break;
      }

      case 'ArrowLeft':
      case 'Left': {
        event.preventDefault(); // otherwise focus() doesn't work
        this.focusOn('prev');
        break;
      }

      case 'ArrowUp':
      case 'Up': {
        event.preventDefault(); // otherwise browser increments number
        this.focusOn('above');
        break;
      }

      case 'ArrowDown':
      case 'Down': {
        event.preventDefault(); // otherwise browser decrements number
        this.focusOn('below');
        break;
      }

      case 'Enter': {
        if (this.props.status !== 'solving') {
          this.props.solve();
        }
        break;
      }
    }
  };

  handleInput = event => {
    const inputIsGood = validateInput(event);

    if (inputIsGood) {
      const formattedVal = event.target.value.trim().slice(0, 1);
      if (this.props.boardVal !== formattedVal) {
        this.props.updateBoardArray(this.props.cellNum, formattedVal);
      }
      this.focusOn('next');
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
    const value = (this.props.status === 'solved')
      ? this.props.solutionVal
      : (this.props.boardVal === '0')
        ? ''
        : this.props.boardVal;

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
      <td className={determineCellClass(this.props.cellNum)}>
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