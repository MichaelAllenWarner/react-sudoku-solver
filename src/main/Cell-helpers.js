export function focusOn(cell, props) {
  const cellToFocusOn = (cell === 'next')
    ? ((props.cellNum === 80) ? 0 : props.cellNum + 1)
    : (cell === 'prev')
      ? ((props.cellNum === 0) ? 80 : props.cellNum - 1)
      : (cell === 'above')
        ? ((props.cellNum <= 8) ? props.cellNum + 72 : props.cellNum - 9)
        : (cell === 'below')
          ? ((props.cellNum >= 72) ? props.cellNum - 72: props.cellNum + 9)
          : props.cellNum;
  props.cellInputRefs[cellToFocusOn].current.focus();
}

export const validateInput = event => (
  Number.isInteger(+event.target.value)
  && +event.target.value >= 1
  && +event.target.value <= 9
);

export const determineCellClass = cellNum => {
  const rowClassHelper = Math.floor(cellNum / 9) % 3;
  const colClassHelper = cellNum % 3;

  const rowClass = (rowClassHelper === 0) ? 'top' : (rowClassHelper === 2) ? 'bottom' : '';
  const colClass = (colClassHelper === 0) ? 'left' : (colClassHelper === 2) ? 'right' : '';

  return `${rowClass} ${colClass}`;
};