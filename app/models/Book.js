const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
});
const BookModel = mongoose.model('books', bookSchema);

module.exports = BookModel;