import { tryWithoutGuessing } from './solve-helpers/try-without-guessing';
import { isSolution } from './solve-helpers/check-if-solved';
import { makeGuessAndTryAgain } from './solve-helpers/make-guess-and-try-again';

export const solve = puzzle => {
  const { puzzleProgress, guessingCell } = tryWithoutGuessing(puzzle);

  return (!puzzleProgress || isSolution(puzzleProgress))
    ? puzzleProgress
    : makeGuessAndTryAgain(puzzleProgress, guessingCell, solve);
};
