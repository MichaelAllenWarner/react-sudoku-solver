import { exhaustAlgorithms } from './exhaust-algorithms';
import { thereIsAContradiction } from './find-contradictions';

export const tryWithoutGuessing = puzzle => {
  const { cells, groups } = exhaustAlgorithms(puzzle);
  return thereIsAContradiction(cells, groups)
    ? {}
    : { board: cells.map(cell => cell.val || 0), cells };
};
