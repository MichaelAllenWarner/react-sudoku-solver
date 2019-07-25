export const makeGuessAndTryAgain = (puzzle, guessingCell, solve) => {
  for (const guess of guessingCell.possVals) {
    puzzle[guessingCell.id] = guess;
    const solution = solve(puzzle);
    if (solution) {
      return solution;
    }
  }
};
