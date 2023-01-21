const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middlewares/auth.middleware');
const { getAll, create, update, deleteOne, detail } = require('../../controllers/v1/books.controller')

router
  .use(verifyToken)
  .get('/books/all', getAll)
  .get('/books/:oid/detail', detail)
  .post('/books/create', create)
  .post('/books/:oid/update', update)
  .delete('/books/:oid/delete', deleteOne)


module.exports = router