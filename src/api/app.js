const express = require('express')
const timeout = require('connect-timeout')
require('express-async-errors')

const routes = require('./app.router')
const e = require('./middlewares/error.middleware')
const m = require('./middlewares/misc.middleware')

const app = express()

app.use(timeout(3000))
app.use(express.json())
app.use(m.httpTimeout)

app.use(routes)

app.use(e.errorLogger)
app.use(e.errorHandler)

module.exports = app