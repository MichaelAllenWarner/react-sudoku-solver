import { makeCellObjArray, makeGroupObjArray } from './obj-arr-makers';
import { exhaustHumanTechniques } from './human-techniques';
import { thereIsAContradiction } from './find-contradictions';
import { chooseGuessingCell } from './choose-guessing-cell';

export const tryHumanTechniques = puzzle => {
  const cells = makeCellObjArray(puzzle);
  const groups = makeGroupObjArray();

  exhaustHumanTechniques(cells, groups);

  const [puzzleProgress, guessingCell] = (thereIsAContradiction(cells, groups))
    ? [null, null]
    : [cells.map(cell => cell.val || 0), chooseGuessingCell(cells)];

  return { puzzleProgress, guessingCell };
};
