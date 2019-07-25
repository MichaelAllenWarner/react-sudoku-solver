import { makeCellObjArray, makeGroupObjArray } from './obj-arr-makers';
import { exhaustAlgorithms } from './exhaust-algorithms';
import { thereIsAContradiction } from './find-contradictions';
import { chooseGuessingCell } from './choose-guessing-cell';

export const tryWithoutGuessing = puzzle => {
  const cells = makeCellObjArray(puzzle);
  const groups = makeGroupObjArray();

  exhaustAlgorithms(cells, groups);

  const [puzzleProgress, guessingCell] = thereIsAContradiction(cells, groups)
    ? []
    : [cells.map(cell => cell.val || 0), chooseGuessingCell(cells)];

  return { puzzleProgress, guessingCell };
};
