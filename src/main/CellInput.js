import React from 'react';
import PropTypes from 'prop-types';

const CellInput = props => (
  <input
    value={props.value}
    onInput={props.handleInput}
    onKeyDown={props.handleKeyDown}
    onKeyUp={props.handleKeyUp}
    onFocus={props.handleFocus}
    ref={props.cellInputRefs[props.cellNum]}
    className={props.className}
    readOnly={props.isReadOnly}
    type="number"
    min="1"
    max="9"
  />
);

CellInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  cellNum: PropTypes.number.isRequired,
  cellInputRefs: PropTypes.arrayOf(PropTypes.number).isRequired,
  className: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired
};

export { CellInput };