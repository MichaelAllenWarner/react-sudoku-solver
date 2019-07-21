/* eslint-disable no-console */

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { puzzleRouter } from './puzzle-router.js';
import { connectToDb } from './db.js';

const app = express();

app.use(compression());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/puzzles', puzzleRouter);

connectToDb();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
