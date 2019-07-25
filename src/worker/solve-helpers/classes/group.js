export class Group {
  constructor(type, num) {
    this.type = type; // row, col, or box
    this.num = num;
    this.takenNums = [];
  }
  
  hasDuplicates() { // indicates a contradiction / invalid board
    const numIsDuplicated = (num, _ind, arr) => arr.indexOf(num) !== arr.lastIndexOf(num);
    return this.takenNums.some(numIsDuplicated);
  }
}
