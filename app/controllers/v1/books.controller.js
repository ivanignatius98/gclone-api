const LOG = 'UserController';
const _ = require('lodash')
const moment = require('moment')
const Book = require('../../models/Book')

module.exports = {
  create: async (req, res) => {
    console.log(`┌─ ${LOG} : save book`);
    const payload = req.body
    Object.assign(payload, { updated_at: moment(), created_at: moment(), })
    try {
      await Book.create(payload)
      return res.locals.helpers.jsonFormat(200, 'Success to save new book')
    } catch ({ message }) {
      return res.locals.helpers.jsonFormat(400, message, null)
    }
  },
  update: async (req, res) => {
    console.log(`┌─ ${LOG} : update book`);
    const { oid } = req.params
    const payload = req.body

    const book = await Book.findOne({ _id: oid }, '_id')
    if (!book) {
      return res.locals.helpers.jsonFormat(400, 'Book not Found')
    }
    Object.assign(book, payload)
    await book.save()
    return res.locals.helpers.jsonFormat(200, 'Success to save book', {})
  },
  deleteOne: async (req, res) => {
    console.log(`┌─ ${LOG} : Delete book`);
    const { oid } = req.params
    await Book.deleteOne({ _id: oid })
    return res.locals.helpers.jsonFormat(200, 'Success to delete book')
  },
  getAll: async (req, res) => {
    try {
      console.log(`┌─ ${LOG} : all book`);
      let { page = 1, limit = 10, search = '' } = req.query

      // paging
      page = parseInt(page, 10)
      limit = parseInt(limit, 10)
      skip = (page - 1) * limit;

      // set conditions
      let conditions = {}
      if (search != '') {
        const searchRegex = new RegExp(search, 'i')
        conditions = { title: searchRegex }
      }
      const fields = {}

      // execute query
      const records = await Book.find(conditions)
        .select(fields)
        .sort({ "updated_at": -1, "_id": -1 })
        .populate("author", "name")
        .limit(limit)
        .skip(skip)
        .lean()
        .exec()
      const count = await Book.find(conditions).countDocuments()

      return res.locals.helpers.jsonFormat(200, 'Success get all book', { records, count })
    } catch (error) {
      console.log(error)
      return res.locals.helpers.jsonFormat(200, 'error', error)
    }
  },
}