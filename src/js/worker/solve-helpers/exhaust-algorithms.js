import { makeCellObjArray, makeGroupObjArray } from './obj-arr-makers';
import {
  addCellValsToGroupTakenNums,
  removeGroupTakenNumsFromCellPossVals,
  solveCellIfHasPossValUniqueToGroup
} from './algorithms';

export const exhaustAlgorithms = puzzle => {
  const cells = makeCellObjArray(puzzle);
  const groups = makeGroupObjArray();

  let changesWereMade;

  do {
    const groupTakenNumsWereUpdated = addCellValsToGroupTakenNums(cells, groups);
    const cellPossValsWereRuledOut = removeGroupTakenNumsFromCellPossVals(cells, groups);
    const cellsWereSolved = solveCellIfHasPossValUniqueToGroup(cells, groups);
  
    changesWereMade = groupTakenNumsWereUpdated || cellPossValsWereRuledOut || cellsWereSolved;
  
    if (changesWereMade) {
      for (const cell of cells) {
        cell.moveLastRemainingPossValToVal();
      }
    }
  } while (changesWereMade);

  return { cells, groups };
};
