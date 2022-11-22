'use strict';


const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
});

// define our model
// this gives mongoose functionality and a predefined schema to shape our data
// it takes in a string and a schema:
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
