const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middlewares/auth.middleware');
const { getAll, create, update, deleteOne } = require('../../controllers/v1/authors.controller')

router
  .use(verifyToken)
  .get('/authors/all', getAll)
  .post('/authors/create', create)
  .post('/authors/:oid/update', update)
  .delete('/authors/:oid/delete', deleteOne)


module.exports = router