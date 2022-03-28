// Represents middleware for the application

// 1 - error logging

const logger = require('../../shared/logger')
const ValidationError = require('../../shared/errors/Validation.error')
const TimeoutError = require('../../shared/errors/Timeout.error')


//https://scoutapm.com/blog/express-error-handling
const errorLogger = (error, req, res, next) => {
    logger.error(`${error}`)
    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    if(error.name === 'TimeoutError') 
        // thrown by httpTimeout middleware
        res.status(503).json({message: `Request timed out`, error: error.message})
    
    else if(error.name === 'CastError') 
        // Mongoose error; Typically thrown when cast to ObjectID fails
        res.status(400).json({message: 'Invalid ID!', error: error.message}) 
    
    else if(error instanceof ValidationError) 
        res.status(400).json({error: error.name}) 
    
    else if(error.message.includes('Resource not found')) 
        // src: https://expressjs.com/en/starter/faq.html
        res.status(404).json({message: 'Resource not found', METHOD: `${req.method}`, PATH: `${req.path}`})
    
    else 
        // all other errors
        res.status(503).json({message: `Could not process request`, error: error.message})
}


// connect-timedout 
// https://github.com/expressjs/timeout
const httpTimeout = (req, res, next) => {
    if(!req.timedout) next()
    else {
        try{
            throw new TimeoutError(`Error, METHOD: ${req.method}, PATH: '${req.path}'`)
        } catch(err){
            logger.error('error thrown in httptimeout')
            next(err)
        }
    }
}

module.exports = {
    errorLogger,
    errorHandler,
    httpTimeout
}
