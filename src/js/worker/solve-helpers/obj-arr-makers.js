import { Cell } from './classes/Cell';
import { Group } from './classes/Group';

export const makeCellObjArray = puzzle => {
  const cellObjArray = [];
  for (const [index, value] of puzzle.entries()) {
    cellObjArray.push(new Cell(index, +value));
  }
  return cellObjArray;
};

export const makeGroupObjArray = () => {
  const groupObjArray = [];
  for (let num = 0; num < 9; num++) {
    groupObjArray.push(new Group('row', num));
    groupObjArray.push(new Group('col', num));
    groupObjArray.push(new Group('box', num));
  }
  return groupObjArray;
};
