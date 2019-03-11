import React from 'react';

export const CellInput = props => (
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