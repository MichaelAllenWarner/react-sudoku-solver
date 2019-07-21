/* eslint-disable no-console */

import mongoose from 'mongoose';

const connectToDb = () => {
  // connect
  const uri = process.env.DB_URI;
  mongoose.connect(uri, { useNewUrlParser: true });

  // logging
  const db = mongoose.connection;
  db.on('error', err => {
    console.error('db connection error:', err);
  });
  db.once('open', () => {
    console.log('db connected');
  });
};

export { connectToDb };
