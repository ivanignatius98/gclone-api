const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  categories: [String],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
});
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;