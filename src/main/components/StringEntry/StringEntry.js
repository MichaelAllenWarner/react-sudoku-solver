import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  deriveStateFromProps,
  _handleChange,
  _handleKeyDown
} from './StringEntry-helpers';

const stringEntryRef = createRef();

const StringEntry = props => {
  const [value, setValue] = useState('');
  const [prevStatus, setPrevStatus] = useState(null); // for deriving value from props

  const state = { value, prevStatus };
  const stateSetters = { setValue, setPrevStatus };

  deriveStateFromProps({ ...state, ...stateSetters, ...props });
  
  const handleChange = event => {
    _handleChange({ ...stateSetters, ...props, event });
  };

  const handleKeyDown = event => {
    _handleKeyDown({ ...props, event });
  };

  return (
    <div>
      <input
        id="stringEntry"
        placeholder="81-digit string entry (anything not 1&ndash;9 is a blank)."
        ref={stringEntryRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => stringEntryRef.current.select()}
      />
    </div>
  );
};

StringEntry.propTypes = {
  replaceBoard: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  board: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { StringEntry };