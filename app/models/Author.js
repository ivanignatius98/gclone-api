const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  profile: {
    data: Buffer,
    contentType: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
})
const AuthorModel = mongoose.model('Author', authorSchema)

module.exports = AuthorModel