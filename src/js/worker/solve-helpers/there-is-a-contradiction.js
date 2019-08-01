export const thereIsAContradiction = (cells, groups) => {
  for (const cell of cells) {
    if (cell.hasNoValAndNoPossValsLeft()) {
      return true;
    }
  }

  for (const group of groups) {
    if (group.hasDuplicates()) {
      return true;
    }
  }
};
