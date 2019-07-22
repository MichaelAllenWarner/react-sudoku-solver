/* eslint-disable react/display-name */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  focusOn,
  validateInput,
  determineCellClass
} from './Cell-helpers';

// 2nd parameter for memo (equivalent of shouldComponentUpdate())
const shouldSkipUpdate = (prevProps, nextProps) => !(
  nextProps.status !== prevProps.status
  || nextProps.boardVal !== prevProps.boardVal
);


const Cell = memo(props => {
  const handleFocus = () => {
    props.cellInputRefs[props.cellNum].current.select();
  };
  
  const handleKeyUp = event => {
    // backspace gets keyUp so that it deletes before focusing on prev cell
    if (event.key === 'Backspace') {
      focusOn('prev', props);
    }
  };

  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        event.preventDefault(); // otherwise focus() doesn't work
        focusOn('next', props);
        break;
      }

      case 'ArrowLeft':
      case 'Left': {
        event.preventDefault(); // otherwise focus() doesn't work
        focusOn('prev', props);
        break;
      }

      case 'ArrowUp':
      case 'Up': {
        event.preventDefault(); // otherwise browser increments number
        focusOn('above', props);
        break;
      }

      case 'ArrowDown':
      case 'Down': {
        event.preventDefault(); // otherwise browser decrements number
        focusOn('below', props);
        break;
      }

      case 'Enter': {
        if (props.status !== 'solving') {
          // props.solve(); not working with memo! some kind of bug, so:
          props.solveButtonRef.current.click();
        }
        break;
      }
    }
  };

  const handleInput = event => {
    const inputIsGood = validateInput(event);

    if (inputIsGood) {
      const formattedVal = (+event.target.value).toString();
      if (props.boardVal !== formattedVal) {
        props.updateBoardArray(props.cellNum, formattedVal);
      }
      focusOn('next', props);
    }
    
    else {
      if (props.boardVal !== '0') {
        props.updateBoardArray(props.cellNum, '0');
      }
    }
  };

  const value = (props.status === 'solved')
    ? props.solutionVal
    : (props.boardVal === '0')
      ? ' ' // EMPTY string doesn't work! see my blog post on this: https://michaelallenwarner.github.io/webdev/2019/05/24/restricting-user-input-on-a-number-type-input-box-in-react.html
      : props.boardVal;

  const valueWasGeneratedBySolver = (
    props.status === 'solved'
    && (props.solutionVal !== props.boardVal)
  );
  
  const isReadOnly = (
    props.status === 'solved'
    || props.status === 'invalid'
    || props.status === 'solving'
  );

  return (
    <td className={determineCellClass(props.cellNum)}>
      <input
        value={value}
        className={valueWasGeneratedBySolver ? 'manualInput generated' : 'manualInput'}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        ref={props.cellInputRefs[props.cellNum]}
        readOnly={isReadOnly}
        type="number"
        min="1"
        max="9"
      />
    </td>
  );
}, shouldSkipUpdate);

Cell.propTypes = {
  status: PropTypes.string.isRequired,
  boardVal: PropTypes.string.isRequired,
  solutionVal: PropTypes.string.isRequired,
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solve: PropTypes.func.isRequired,
  solveButtonRef: PropTypes.object.isRequired,
  updateBoardArray: PropTypes.func.isRequired
};

export { Cell };
