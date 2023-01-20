const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helperUtils = require('./app/utils/helper')
const userRouter = require('./app/routes/v1/user')
const booksRouter = require('./app/routes/v1/book')
const mongoose = require('mongoose')
require('dotenv').config()

// mongo configuration
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (errMongo) => {
    if (errMongo != null) {
      console.log("MONGO CONNECTION ERROR : ", errMongo)
    }
  })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }))

// parse application/json
app.use(bodyParser.json({ limit: '100mb' }))

app.use((req, res, next) => {
  res.locals.helpers = {
    jsonFormat: (httpCode, message, data = null) => {
      return res.status(httpCode).json({
        meta: {
          status: httpCode,
          message,
        },
        data
      })
    },
    ...helperUtils
  }
  next()
})

app.use('/api/v1', userRouter)
app.use('/api/v1', booksRouter)

app.get('/404', function (req, res, next) {
  next();
});

app.get('/403', function (req, res, next) {
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.code = 403;
  next(err);
});

app.get('/500', function (req, res, next) {
  // trigger a generic (500) error
  next({ message: 'Something went wrong' });
});

app.use(function (req, res, next) {
  next({ message: 'Url not found', code: 404 })
});

app.use(function (err, req, res, next) {
  if (res.locals.helpers == undefined) {
    console.error(err)
    return res.status(500).json({ message: "something went wrong" })
  } else {
    return res.locals.helpers.jsonFormat(err.code || 500, err.message)
  }
});

app.listen(process.env.PORT, () => {
  console.log("------------------------------------------------------")
  console.log(`Finance services running at http://localhost:${process.env.PORT}`)
  console.log("------------------------------------------------------")
})
