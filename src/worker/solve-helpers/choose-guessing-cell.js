// choose a cell with no value and with fewest possVals left (2 is ideal)

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
