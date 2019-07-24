const focusOn = (cell, props) => {
  let cellToFocusOn;
  switch (cell) {
    case 'next': {
      cellToFocusOn = (props.cellNum === 80) ? 0 : props.cellNum + 1;
      break;
    }
    case 'prev': {
      cellToFocusOn = (props.cellNum === 0) ? 80 : props.cellNum - 1;
      break;
    }
    case 'above': {
      cellToFocusOn = (props.cellNum <= 8) ? props.cellNum + 72 : props.cellNum - 9;
      break;
    }
    case 'below': {
      cellToFocusOn = (props.cellNum >= 72) ? props.cellNum - 72: props.cellNum + 9;
      break;
    }
  }
  props.cellInputRefs[cellToFocusOn].current.focus();
};

export const focusHandler = props => {
  props.cellInputRefs[props.cellNum].current.select();
};

export const keyUpHandler = (event, props) => {
  if (event.key === 'Backspace') { // backspace gets keyUp so it deletes before refocus
    focusOn('prev', props);
  }
};

export const keyDownHandler = (event, props) => {
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

export const inputHandler = (event, props) => {
  const inputIsGood = (
    Number.isInteger(+event.target.value)
    && +event.target.value >= 1
    && +event.target.value <= 9
  );

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

export const determineCellClass = cellNum => {
  const rowClassHelper = Math.floor(cellNum / 9) % 3;
  const colClassHelper = cellNum % 3;

  const rowClass = (rowClassHelper === 0) ? 'top' : (rowClassHelper === 2) ? 'bottom' : '';
  const colClass = (colClassHelper === 0) ? 'left' : (colClassHelper === 2) ? 'right' : '';

  return `${rowClass} ${colClass}`;
};

export const determineValue = props => {
  if (props.status === 'solved') {
    return props.solutionVal;
  }
  if (props.boardVal === '0') {
    return '';
  }
  return props.boardVal;
};

export const determineInputClass = props => {
  if (props.status === 'solved' && props.solutionVal !== props.boardVal) {
    return 'manualInput generated';
  }
  return 'manualInput';
};

export const determineIfReadOnly = props => (
  props.status === 'solved'
  || props.status === 'invalid'
  || props.status === 'solving'
);
