import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = mongoose;

const PuzzleSchema = new Schema({
  board: {
    type: String,
    minlength: [81, 'Board string must be exactly 81 characters long'],
    maxlength: [81, 'Board string must be exactly 81 characters long'],
    required: true,
    unique: true
  }
});

PuzzleSchema.plugin(uniqueValidator);

const Puzzle = model('Puzzle', PuzzleSchema);

export { Puzzle };
