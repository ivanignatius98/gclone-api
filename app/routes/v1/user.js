const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middlewares/auth.middleware');
const { getAll, login, create, update, deleteOne, refreshToken } = require('../../controllers/v1/users.controller')

router
  .post('/user/create', create)
  .post('/user/login', login)
  .post('/user/refresh-token', refreshToken)

router
  .use(verifyToken)
  .get('/user/all', getAll)
  .post('/user/:oid/update', update)
  .delete('/user/:oid/delete', deleteOne)


module.exports = router