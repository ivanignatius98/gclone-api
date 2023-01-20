const LOG = 'AuthorsController';
const _ = require('lodash')
const moment = require('moment')
const Author = require('../../models/Author')

module.exports = {
  create: async (req, res) => {
    console.log(`┌─ ${LOG} : save author`);
    const payload = req.body
    Object.assign(payload, { updated_at: moment(), created_at: moment(), })
    try {
      await Author.create(payload)
      return res.locals.helpers.jsonFormat(200, 'Success to save new author')
    } catch ({ message }) {
      return res.locals.helpers.jsonFormat(400, message, null)
    }
  },
  update: async (req, res) => {
    console.log(`┌─ ${LOG} : update author`);
    const { oid } = req.params
    const payload = req.body

    const author = await Author.findOne({ _id: oid }, '_id')
    if (!author) {
      return res.locals.helpers.jsonFormat(400, 'Author not Found')
    }
    Object.assign(author, payload)
    await author.save()
    return res.locals.helpers.jsonFormat(200, 'Success to save author', {})
  },
  deleteOne: async (req, res) => {
    console.log(`┌─ ${LOG} : Delete author`);
    const { oid } = req.params
    await Author.deleteOne({ _id: oid })
    return res.locals.helpers.jsonFormat(200, 'Success to delete author')
  },
  getAll: async (req, res) => {
    try {
      console.log(`┌─ ${LOG} : all author`);
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
      const records = await Author.find(conditions)
        .select(fields)
        .sort({ "updated_at": -1, "_id": -1 })
        .limit(limit)
        .skip(skip)
        .lean()
        .exec();
      return res.locals.helpers.jsonFormat(200, 'Success get all author', { records })
    } catch (error) {
      return res.locals.helpers.jsonFormat(200, 'error', error)
    }
  },
}