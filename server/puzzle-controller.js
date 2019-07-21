import { Puzzle } from './puzzle-model.js';

const create = async (req, res) => {
  try {
    // format the board string first, THEN send it to db
    req.body.board = req.body.board.replace(/[^0-9]/gi, '0');
    const puzzle = new Puzzle(req.body);
    const savedPuzzle = await puzzle.save(); // exec() ?
    res.send(savedPuzzle);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getRandom = async(_req, res) => {
  try {
    const count = await Puzzle.countDocuments(); // exec() ?
    const random = Math.floor(Math.random() * count);
    const puzzle = await Puzzle.findOne().skip(random).select('board'); // exec() ?
    // disable browser caching (for IE 10/11)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.send(puzzle);
  } catch (err) {
    res.status(500).send(err);
  }
};

export { create, getRandom };
