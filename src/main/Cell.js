import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  focusHandler,
  keyUpHandler,
  keyDownHandler,
  inputHandler,
  determineCellClass,
  determineValue,
  determineInputClass,
  determineIfReadOnly
} from './Cell-helpers';

const UnmemoizedCell = props => {
  const handleFocus = () => {
    focusHandler(props);
  };
  
  const handleKeyUp = event => {
    keyUpHandler(event, props);
  };

  const handleKeyDown = event => {
    keyDownHandler(event, props);
  };

  const handleInput = event => {
    inputHandler(event, props);
  };

  return (
    <td className={determineCellClass(props.cellNum)}>
      <input
        value={determineValue(props)}
        className={determineInputClass(props)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        ref={props.cellInputRefs[props.cellNum]}
        readOnly={determineIfReadOnly(props)}
        type={'tel' /* not 'number' b/c of React bug: https://michaelallenwarner.github.io/webdev/2019/05/24/restricting-user-input-on-a-number-type-input-box-in-react.html */}
      />
    </td>
  );
};

UnmemoizedCell.propTypes = {
  status: PropTypes.string.isRequired,
  boardVal: PropTypes.string.isRequired,
  solutionVal: PropTypes.string.isRequired,
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  solveButtonRef: PropTypes.object.isRequired, // instead of solve b/c of memo bug (see keyDownHandler)
  updateBoardArray: PropTypes.func.isRequired
};

// equivalent of shouldComponentUpdate() (but inverse: should component NOT update)
const shouldSkipUpdate = (prevProps, nextProps) => (
  nextProps.status === prevProps.status
  && nextProps.boardVal === prevProps.boardVal
);

const Cell = memo(UnmemoizedCell, shouldSkipUpdate);

export { Cell };
