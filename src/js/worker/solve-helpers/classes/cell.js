export class Cell {
  constructor(id, val) {
    this.id = id;
    this.val = val || null;
    this.possVals = val ? [] : Array.from({ length: 9 }, (_el, ind) => ind + 1);
    this.accountedForInGroupTakenNums = false;
  }

  row() {
    return Math.floor(this.id / 9);
  }

  col() {
    return this.id % 9;
  }

  box() {
    return (3 * Math.floor(this.row() / 3)) + Math.floor(this.col() / 3);
  }

  isAccountedForInGroupTakenNums() {
    return this.accountedForInGroupTakenNums;
  }

  accountForInGroupTakenNums() {
    this.accountedForInGroupTakenNums = true;
  }

  stillHasAsAPossVal(num) {
    return this.possVals.includes(num);
  }

  removeFromPossVals(takenNum) {
    const index = this.possVals.indexOf(takenNum);
    if (index !== -1) {
      this.possVals.splice(index, 1);
    }
  }

  solve(val) {
    this.possVals = [val]; // don't set cell val directly (see next method)
  }

  // this method is a "clean-up" phase that runs between solve-algorithm iterations
  // (setting cell val during algorithm iterations would interfere with their logic)
  moveLastRemainingPossValToVal() {
    if (this.possVals.length === 1 && !this.val) {
      this.val = this.possVals[0];
      this.possVals.pop();
    }
  }

  hasNoValAndNoPossValsLeft() { // indicates a contradiction / invalid board
    return !this.val && !this.possVals.length;
  }
}
