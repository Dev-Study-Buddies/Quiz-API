// Represents express app setup & configuration

// 1 - cors:
//  Allow applications from different origins to use the API endpoints
//  TODO: look into configuring cors to implement better security
//  src: https://expressjs.com/en/resources/middleware/cors.html

// 2 - connect-timeout:
//  Returns error if request takes too long by setting maximum processing time for requests
//  src: https://medium.com/dataseries/add-timeout-capability-to-express-apps-with-connect-timeout-fce06d76e07a

// 3 - express-async-errors:
//  Allows you to throw async errors automatically to express error-handling middleware
//      otherwise, you would need to use next(err) for all async router operations
//  src: https://medium.com/@utkuu/error-handling-in-express-js-and-express-async-errors-package-639c91ba3aa2

// 4 - express.json()
/*
    Without the json-parser, the body property would be undefined. 
    The json-parser functions so that it takes the JSON data of a request, 
    transforms it into a JavaScript object and then attaches it 
    to the body property of the request object before the route handler is called.
        src: https://fullstackopen.com/en/part3/node_js_and_express#receiving-data
*/


const express = require('express')
const cors = require('cors')               // 1
const timeout = require('connect-timeout') // 2
require('express-async-errors')            // 3

const routes = require('./router')
const m = require('./middleware')

const app = express()

app.use(timeout(3000))
app.use(express.json()) // 4
app.use(cors())
app.use(m.httpTimeout)

app.use(routes)

app.use(m.errorLogger)
app.use(m.errorHandler)

module.exports = app