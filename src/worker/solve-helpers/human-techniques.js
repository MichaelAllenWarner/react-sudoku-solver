export const exhaustHumanTechniques = (cells, groups) => {
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

function addValsToTakenNums (cells, groups) {
  const groupAndCellValPairs = [];

  for (const cell of cells) {
    if (!cell.val || cell.isAccountedForInGroupTakenNums) {
      continue;
    }

    cell.isAccountedForInGroupTakenNums = true;

    const groupContainsCell = group => cell[group.groupType]() === group.num;
    const pushGroupAndVal = group => {
      groupAndCellValPairs.push([group, cell.val]);
    };

    groups
      .filter(groupContainsCell)
      .forEach(pushGroupAndVal);
  }

  for (const [group, val] of groupAndCellValPairs) {
    group.takenNums.push(val);
  }

  return !!groupAndCellValPairs.length;
}

function removeTakenNumsFromPossVals(cells, groups) {
  const cellAndTakenNumPairs = [];

  for (const cell of cells) {
    if (cell.val) {
      continue;
    }

    const groupContainsCellAndHasTakenNums = group =>
      cell[group.groupType]() === group.num
      && group.takenNums.length > 0;

    const pushCellAndTakenNums = group => {
      for (const takenNum of group.takenNums) {
        if (cell.possVals.includes(takenNum)) {
          cellAndTakenNumPairs.push([cell, takenNum]);
        }
      }
    };

    groups
      .filter(groupContainsCellAndHasTakenNums)
      .forEach(pushCellAndTakenNums);
  }

  for (const [cell, number] of cellAndTakenNumPairs) {
    const index = cell.possVals.indexOf(number);
    if (index !== -1) { // in case of duplicates in cellAndTakenNumPairs
      cell.possVals.splice(index, 1);
    }
  }

  return !!cellAndTakenNumPairs.length;
}

function makeUniquePossValsCellVals(cells, groups) {
  const cellAndUniqueValPairs = [];

  for (const group of groups) {
    const cellsInGroup = [];
    const possValsInGroup = [];

    const cellIsInGroup = cell => cell[group.groupType]() === group.num;
    const pushCellAndPossValsToGroupArrays = cell => {
      cellsInGroup.push(cell);
      Array.prototype.push.apply(possValsInGroup, cell.possVals);
    };

    cells
      .filter(cellIsInGroup)
      .forEach(pushCellAndPossValsToGroupArrays);

    const possValIsUniqueInGroup = (val, _ind, arr) => arr.indexOf(val) === arr.lastIndexOf(val);
    const pushUniqueValAndItsCell = val => {
      const cellWithUniquePossVal = cellsInGroup.find(cell => cell.possVals.includes(val));
      cellAndUniqueValPairs.push([cellWithUniquePossVal, val]);
    };

    possValsInGroup
      .filter(possValIsUniqueInGroup)
      .forEach(pushUniqueValAndItsCell);
  }

  for (const [cell, uniquePossVal] of cellAndUniqueValPairs) {
    cell.possVals = [uniquePossVal];
  }

  return !!cellAndUniqueValPairs.length;
}
