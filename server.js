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

// must have to receive json request
app.use(express.json());

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
app.post('/book', postBooks);
// Path parameter - a variable that we declare in the path
app.delete('/book/:id', deleteBooks);



async function getBooks(req, res, next) {
  try {
    // get book data from the database
    let results = await Book.find();
    res.status(200).send(results);

  }catch(err){
    next(err);
  }
}

// for a query
// http://localhost:3001/book?color=orange
// access orange
//  req.query.color

async function postBooks(req, res, next) {
  try {
    console.log(req.body);
    let createbook = await Book.create(req.body);
    res.send(createbook);

  }catch(err){
    next(err);
  }
}


async function deleteBooks(req, res, next) {
  try {
    // get the id of the book we want to delete
    console.log(req.params.id);

    // make a request to the database to delete the book in question
    // Do not assume that you will get a response:
    await Book.findByIdAndDelete(req.params.id);
    res.send('book deleted');

  }catch(err){
    next(err);
  }
}


app.get('*', (req, res) => {
  res.status(404).send('Not available');
});

// ERROR
app.use((error, request, response,) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
