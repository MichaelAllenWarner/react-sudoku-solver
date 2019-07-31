const cellIsInGroup = (cell, group) => cell[group.type]() === group.num;

export const addValsToTakenNums = (cells, groups) => {
  const cellsReducer = (acc, cell) => {
    if (!cell.val || cell.isAccountedForInGroupTakenNums) {
      return acc;
    }
    cell.isAccountedForInGroupTakenNums = true;
    for (const group of groups) {
      if (cellIsInGroup(cell, group)) {
        acc.push([group, cell.val]);
      }
    }
    return acc;
  };

  const groupAndCellValPairs = cells.reduce(cellsReducer, []);

  for (const [group, val] of groupAndCellValPairs) {
    group.takenNums.push(val);
  }

  return !!groupAndCellValPairs.length;
};

export const removeTakenNumsFromPossVals = (cells, groups) => {
  const cellsReducer = (acc, cell) => {
    if (cell.val) {
      return acc;
    }
    for (const group of groups) {
      if (!cellIsInGroup(cell, group) || !group.takenNums.length) {
        continue;
      }
      for (const takenNum of group.takenNums) {
        if (cell.possVals.includes(takenNum)) {
          acc.push([cell, takenNum]); // duplicates can occur!
        }
      }
    }
    return acc;
  };

  const cellAndTakenNumPairs = cells.reduce(cellsReducer, []);

  for (const [cell, takenNum] of cellAndTakenNumPairs) {
    const index = cell.possVals.indexOf(takenNum);
    if (index !== -1) { // in case of duplicates in cellAndTakenNumPairs
      cell.possVals.splice(index, 1);
    }
  }

  return !!cellAndTakenNumPairs.length;
};

export const makeUniquePossValsCellVals = (cells, groups) => {
  const groupsReducer = (groupsAcc, group) => {
    const cellsReducer = (cellsAcc, cell) => {
      if (!cellIsInGroup(cell, group)) {
        return cellsAcc;
      }
      cellsAcc.cellsInGroup.push(cell);
      Array.prototype.push.apply(cellsAcc.possValsInGroup, cell.possVals);
      return cellsAcc;
    };

    const {
      cellsInGroup,
      possValsInGroup
    } = cells.reduce(cellsReducer, {
      cellsInGroup: [],
      possValsInGroup: []
    });

    for (const possVal of possValsInGroup) {
      // skip possVal if it isn't unique in array
      if (possValsInGroup.indexOf(possVal) !== possValsInGroup.lastIndexOf(possVal)) {
        continue;
      }
      const cellWithUniquePossVal = cellsInGroup.find(cell => cell.possVals.includes(possVal));
      groupsAcc.push([cellWithUniquePossVal, possVal]);
    }
    return groupsAcc;
  };

  const cellAndUniqueValPairs = groups.reduce(groupsReducer, []);

  for (const [cell, uniquePossVal] of cellAndUniqueValPairs) {
    cell.possVals = [uniquePossVal];
  }

  return !!cellAndUniqueValPairs.length;
};
