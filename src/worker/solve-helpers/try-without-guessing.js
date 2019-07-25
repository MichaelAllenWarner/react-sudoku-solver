import { makeCellObjArray, makeGroupObjArray } from './obj-arr-makers';
import { exhaustAlgorithms } from './exhaust-algorithms';
import { thereIsAContradiction } from './find-contradictions';

export const tryWithoutGuessing = puzzle => {
  const cells = makeCellObjArray(puzzle);
  const groups = makeGroupObjArray();

  exhaustAlgorithms(cells, groups);

  return thereIsAContradiction(cells, groups)
    ? {}
    : { board: cells.map(cell => cell.val || 0), cells };
};
