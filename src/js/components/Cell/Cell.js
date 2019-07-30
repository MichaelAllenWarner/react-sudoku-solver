import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  _handleKeyUp,
  _handleKeyDown,
  _handleChange,
  determineCellClass,
  determineValue,
  determineInputClass,
  determineIfReadOnly,
  shouldSkipUpdate
} from './Cell-helpers';
import styles from './Cell-styles.css';

const UnmemoizedCell = props => {  
  const handleKeyUp = event => {
    _handleKeyUp({ ...props, event });
  };

  const handleKeyDown = event => {
    _handleKeyDown({ ...props, event });
  };

  const handleChange = event => {
    _handleChange({ ...props, event });
  };

  return (
    <td className={determineCellClass(props.cellNum, styles)}>
      <input
        ref={props.cellInputRefs[props.cellNum]}
        value={determineValue(props)}
        className={determineInputClass(props, styles)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => props.cellInputRefs[props.cellNum].current.select()}
        readOnly={determineIfReadOnly(props.status)}
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
  solveButtonRef: PropTypes.object.isRequired, // instead of solve b/c of memo bug (see _handleKeyDown)
  updateBoard: PropTypes.func.isRequired
};

const Cell = memo(UnmemoizedCell, shouldSkipUpdate);

export { Cell };
