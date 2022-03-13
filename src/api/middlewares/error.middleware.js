const logger = require('../../shared/logger')
const ValidationError = require('../../shared/errors/Validation.error')

//https://scoutapm.com/blog/express-error-handling

const errorLogger = (error, req, res, next) => {
    logger.error(`${error}`)
    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    if(error.name === 'TimeoutError') res.status(503).json({message: `Request timed out`, error: error.message})
    else if(error.name === 'CastError') res.status(400).json({message: 'Invalid ID!', error: error.message}) // Typically thrown when cast to ObjectID fails
    else if(error instanceof ValidationError) res.status(400).json({error: error.name}) // thrown from mongoose schema validation failure
    // https://expressjs.com/en/starter/faq.html
    else if(error.message.includes('Resource not found')) res.status(404).json({message: 'Resource not found', METHOD: `${req.method}`, PATH: `${req.path}`})
    else res.status(503).json({message: `Could not process request`, error: error.message})
}

module.exports = {
    errorLogger,
    errorHandler
}


/*
src: https://scoutapm.com/blog/express-error-handling
How to perform redirects, ex:

app.get('/two', (req, res, next) => {
  fsPromises.readFile('./two.txt')
    .then(data => res.send(data))
    .catch(err => {
        // this will trigger the errorResponder to redirect to the /error page
        err.type = 'redirect' // custom prop to specify handling behaviour
        next(err)
    })
})

How to handle time outs
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  console.error('Error: ', error)
 
  if (error.type == 'redirect')
      res.redirect('/error')

   else if (error.type == 'time-out') // arbitrary condition check
      res.status(408).send(error)
  else
      res.status(500).send(error)
})
*/