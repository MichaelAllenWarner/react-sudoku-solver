// choose a cell with no value and with fewest possVals left (2 is ideal).
// Could use sort() or reduce(), but loop w/ continue/break/return is faster.
// (Does it matter? not sure, but this IS part of our recursive solve function)

export const chooseGuessingCell = cells => {
  let guessingCell;

  for (const cell of cells) {
    if (cell.val) {
      continue;
    }

    if (cell.possVals.length === 2) {
      guessingCell = cell;
      break;
    }

    if (!guessingCell || cell.possVals.length < guessingCell.possVals.length) {
      guessingCell = cell;
    }
  }

  return guessingCell;
};
