const cellIsInGroup = (cell, group) => cell[group.type]() === group.num;

export const addCellValsToGroupTakenNums = (cells, groups) => {
  const cellsReducer = (acc, cell) => {
    if (!cell.val || cell.isAccountedForInGroupTakenNums()) {
      return acc;
    }
    cell.accountForInGroupTakenNums();
    for (const group of groups) {
      if (cellIsInGroup(cell, group)) {
        acc.push([group, cell.val]);
      }
    }
    return acc;
  };

  const groupAndCellValPairs = cells.reduce(cellsReducer, []);

  for (const [group, val] of groupAndCellValPairs) {
    group.addCellValToTakenNums(val);
  }

  return !!groupAndCellValPairs.length;
};

export const removeGroupTakenNumsFromCellPossVals = (cells, groups) => {
  const cellsReducer = (acc, cell) => {
    if (cell.val) {
      return acc;
    }
    for (const group of groups) {
      if (!cellIsInGroup(cell, group) || !group.hasTakenNums()) {
        continue;
      }
      for (const takenNum of group.takenNums) {
        if (cell.stillHasAsAPossVal(takenNum)) {
          acc.push([cell, takenNum]); // duplicates can occur!
        }
      }
    }
    return acc;
  };

  const cellAndTakenNumPairs = cells.reduce(cellsReducer, []);

  for (const [cell, takenNum] of cellAndTakenNumPairs) {
    cell.removeFromPossVals(takenNum); // safe in case of duplicates in cellAndTakenNumPairs
  }

  return !!cellAndTakenNumPairs.length;
};

export const solveCellIfHasPossValUniqueToGroup = (cells, groups) => {
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

  for (const [cell, val] of cellAndUniqueValPairs) {
    cell.solve(val);
  }

  return !!cellAndUniqueValPairs.length;
};
