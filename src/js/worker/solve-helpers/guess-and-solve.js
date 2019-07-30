import { chooseGuessingCell } from './choose-guessing-cell';

export const guessAndSolve = ({ board: puzzle, cells }, solve) => {
  const guessingCell = chooseGuessingCell(cells);
  for (const guess of guessingCell.possVals) {
    puzzle[guessingCell.id] = guess;
    const solution = solve(puzzle);
    if (solution) {
      return solution;
    }
  }
};
