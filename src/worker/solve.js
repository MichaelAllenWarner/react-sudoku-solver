import { tryHumanTechniques } from './solve-helpers/try-human-techniques';
import { isSolution } from './solve-helpers/check-if-solved';
import { makeGuessAndTryAgain } from './solve-helpers/make-guess-and-try-again';

export const solve = puzzle => {
  const { puzzleProgress, guessingCell } = tryHumanTechniques(puzzle);

  return (!puzzleProgress || isSolution(puzzleProgress))
    ? puzzleProgress
    : makeGuessAndTryAgain(puzzleProgress, guessingCell, solve);
};
