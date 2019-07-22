import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';

const StringEntry = props => {
  const [value, setValue] = useState('');
  const [prevStatus, setPrevStatus] = useState(null);

  // "static getDerivedStateFromProps()" equivalent
  if (props.status !== prevStatus) {
    if (props.status === 'cleared') {
      setValue('');
    }
    if (props.status === 'solving') {
      setValue(props.boardArray.join(''));
    }
    setPrevStatus(props.status);
  }

  const stringEntryRef = createRef();

  const handleInput = event => {
    if (props.status === 'solving') {
      return;
    }

    // convert non-number characters to 0
    const formattedString = event.target.value.replace(/[^0-9]/gi, '0');
    setValue(formattedString);

    if (formattedString.length === 81) {
      props.replaceBoardArray(formattedString.split(''));
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      props.solve();
    }
  };

  const handleFocus = () => {
    stringEntryRef.current.select();
  };

  return (
    <div>
      <input
        id="stringEntry"
        placeholder="81-digit string entry (anything not 1&ndash;9 is a blank)."
        ref={stringEntryRef}
        value={value}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
    </div>
  );
};

StringEntry.propTypes = {
  replaceBoardArray: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  boardArray: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { StringEntry };