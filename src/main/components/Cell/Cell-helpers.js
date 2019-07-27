const focusOn = (newCellRelation, { cellNum: oldCellNum, cellInputRefs }) => {
  let newCellNum;
  switch (newCellRelation) {
    case 'next': {
      newCellNum = (oldCellNum === 80) ? 0 : oldCellNum + 1;
      break;
    }
    case 'prev': {
      newCellNum = (oldCellNum === 0) ? 80 : oldCellNum - 1;
      break;
    }
    case 'above': {
      newCellNum = (oldCellNum <= 8) ? oldCellNum + 72 : oldCellNum - 9;
      break;
    }
    case 'below': {
      newCellNum = (oldCellNum >= 72) ? oldCellNum - 72: oldCellNum + 9;
      break;
    }
  }
  cellInputRefs[newCellNum].current.focus();
};

export const _handleKeyUp = ({ event, ...props }) => {
  if (event.key === 'Backspace') { // backspace gets keyUp so it deletes before refocus
    focusOn('prev', props);
  }
};

export const _handleKeyDown = ({ event, status, solveButtonRef, ...otherProps }) => {
  switch (event.key) {
    case 'ArrowRight':
    case 'Right': {
      event.preventDefault(); // otherwise focus() doesn't work
      focusOn('next', otherProps);
      break;
    }

    case 'ArrowLeft':
    case 'Left': {
      event.preventDefault(); // otherwise focus() doesn't work
      focusOn('prev', otherProps);
      break;
    }

    case 'ArrowUp':
    case 'Up': {
      event.preventDefault(); // otherwise browser increments number
      focusOn('above', otherProps);
      break;
    }

    case 'ArrowDown':
    case 'Down': {
      event.preventDefault(); // otherwise browser decrements number
      focusOn('below', otherProps);
      break;
    }

    case 'Enter': {
      if (status !== 'solving') {
        // props.solve(); not working with memo! some kind of bug, so:
        solveButtonRef.current.click();
      }
      break;
    }
  }
};

export const _handleChange = ({
  event,
  boardVal,
  updateBoard,
  cellNum,
  ...otherProps
}) => {
  const inputIsGood = (
    Number.isInteger(+event.target.value)
    && +event.target.value >= 1
    && +event.target.value <= 9
  );

  if (inputIsGood) {
    const formattedVal = (+event.target.value).toString();
    if (boardVal !== formattedVal) {
      updateBoard(cellNum, formattedVal);
    }
    focusOn('next', { cellNum, ...otherProps });
  }
  
  else {
    if (boardVal !== '0') {
      updateBoard(cellNum, '0');
    }
  }
};

export const determineCellClass = (cellNum, styles) => {
  const rowClassHelper = Math.floor(cellNum / 9) % 3;
  const colClassHelper = cellNum % 3;

  const rowClass = (rowClassHelper === 0) ? styles.top : (rowClassHelper === 2) ? styles.bottom : '';
  const colClass = (colClassHelper === 0) ? styles.left : (colClassHelper === 2) ? styles.right : '';

  return `${styles.cell} ${rowClass} ${colClass}`;
};

export const determineValue = ({ status, solutionVal, boardVal }) => {
  if (status === 'solved') {
    return solutionVal;
  }
  if (boardVal === '0') {
    return '';
  }
  return boardVal;
};

export const determineInputClass = ({ status, solutionVal, boardVal }, styles) => {
  if (status === 'solved' && solutionVal !== boardVal) {
    return styles.solvedInput;
  }
};

export const determineIfReadOnly = status => (
  status === 'solved'
  || status === 'invalid'
  || status === 'solving'
);

// equivalent of shouldComponentUpdate() (but inverse: should component NOT update)
export const shouldSkipUpdate = (prevProps, nextProps) => (
  // because status changes to 'ready' immediately after (avoid double-update):
  nextProps.status === 'cleared'
  ||
  // so that changing one cell doesn't cause update-check for ALL cells:
  (   
    nextProps.status === prevProps.status
    && nextProps.boardVal === prevProps.boardVal
  )
);
