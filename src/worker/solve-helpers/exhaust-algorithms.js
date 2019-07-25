import {
  addValsToTakenNums,
  removeTakenNumsFromPossVals,
  makeUniquePossValsCellVals
} from './algorithms';

export const exhaustAlgorithms = (cells, groups) => {
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
};
