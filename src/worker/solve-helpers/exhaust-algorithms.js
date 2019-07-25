import { makeCellObjArray, makeGroupObjArray } from './obj-arr-makers';
import {
  addValsToTakenNums,
  removeTakenNumsFromPossVals,
  makeUniquePossValsCellVals
} from './algorithms';

export const exhaustAlgorithms = puzzle => {
  const cells = makeCellObjArray(puzzle);
  const groups = makeGroupObjArray();

  let changesWereMade;

  do {
    const valsWereAdded = addValsToTakenNums(cells, groups);
    const takenNumsWereRemoved = removeTakenNumsFromPossVals(cells, groups);
    const uniquesWereMadeVals = makeUniquePossValsCellVals(cells, groups);
  
    changesWereMade = valsWereAdded || takenNumsWereRemoved || uniquesWereMadeVals;
  
    if (changesWereMade) {
      for (const cell of cells) {
        cell.moveLastRemainingPossValToVal();
      }
    }
  } while (changesWereMade);

  return { cells, groups };
};
