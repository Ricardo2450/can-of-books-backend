'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');

// must bring in a schema is we want to interact with the model
const Book = require('./models/book.js');


const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);


// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Mongoose is connected.`);
});

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {

  response.send(200).send('Welcome to can of books backend');

});

app.get('/book', getBooks);

async function getBooks(req, res, next) {
  try {
    // get book data from the database
    let results = await Book.find();
    res.status(200).send(results);

  }catch(err){
    next(err);
  }
}


app.get('*', (req, res) => {
  res.status(404).send('Not available');
});

// ERROR
app.use((error, request, response,next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
