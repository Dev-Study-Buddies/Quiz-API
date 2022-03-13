const TimeoutError = require('../../shared/errors/Timeout.error')
const logger = require('../../shared/logger')

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
    httpTimeout,
}



// custom way of doing it
// const httpTimeout = (req, res, next) => {
//     const cb = () => {
//         try{
//             throw new TimeoutError(`Error at: ${req.method}: ${req.path}`)
//         } catch(err){
//             logger.error('error thrown in httptimeout')
//             next(err)
//         }
//     }
//
//     res.setTimeout(1000, cb)
//     next()
// }