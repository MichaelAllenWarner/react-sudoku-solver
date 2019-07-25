import { tryWithoutGuessing } from './solve-helpers/try-without-guessing';
import { isSolution } from './solve-helpers/check-if-solved';
import { guessAndSolve } from './solve-helpers/guess-and-solve';

export const solve = puzzle => {
  const progress = tryWithoutGuessing(puzzle);
  return (!progress.board || isSolution(progress.board))
    ? progress.board
    : guessAndSolve(progress, solve); // recursion
};
