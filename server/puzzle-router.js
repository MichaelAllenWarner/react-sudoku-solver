import express from 'express';

import * as puzzles from './puzzle-controller.js';

const puzzleRouter = express.Router();

puzzleRouter.route('/')
  .get(puzzles.getRandom);


// can only post puzzle in db w/ secret path stored in env;
// not really secure but winging it for now

puzzleRouter.route(`/${process.env.PUZZLE_POST_PATH}`)
  .post(puzzles.create);

export { puzzleRouter };
