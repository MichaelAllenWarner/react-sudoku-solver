export function focusOn(cell) {
  const cellToFocusOn = (cell === 'next')
    ? ((this.props.cellNum === 80) ? 0 : this.props.cellNum + 1)
    : (cell === 'prev')
      ? ((this.props.cellNum === 0) ? 80 : this.props.cellNum - 1)
      : (cell === 'above')
        ? ((this.props.cellNum <= 8) ? this.props.cellNum + 72 : this.props.cellNum - 9)
        : (cell === 'below')
          ? ((this.props.cellNum >= 72) ? this.props.cellNum - 72: this.props.cellNum + 9)
          : this.props.cellNum;
  this.props.cellInputRefs[cellToFocusOn].current.focus();
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