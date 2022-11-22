'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');
mongoose.connect(process.env.MONGODB_URL);




async function seed() {
  // add some books to database
  // must follow the same format as our book schema

  // title: {type: String, required: true},
  // description: {type: String, required: true},
  // status: {type: String, required: true},

  await Book.create({
    title: 'it ends with us',
    description: 'Lily finding her self-worth',
    status: 'in stock'
  });
  console.log('it ends with us was added');

  await Book.create({
    title: 'Song of achilles',
    description: 'retelling of a greek myth',
    status: 'in stock',
  });
  console.log('Song of achilles was added');

  await Book.create({
    title: 'The Giver',
    description: 'The Giver is a morally driven and interesting story about a young boy called Jonas who lives in a society free of crime and sadness.',
    status: 'not in stock',
  });
  console.log('the Giver was added');

  // close the connection to the database
  mongoose.disconnect();
}

seed();
