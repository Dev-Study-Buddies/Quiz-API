/* eslint-disable no-ex-assign */
const devUserService = require('../service')
const logger = require('../../../shared/logger')
const ValidationError = require('../../../shared/errors/Validation.error')

const post = async (req, res, next) => {
    try{
        const apiKey = devUserService.create(req.body)
        res.json(apiKey)
    } catch(err){
        if(err.name === 'TypeError') err = new ValidationError('devUser')
        logger.error(`Error in dev.controller.post\n: ${err}`)
        next(err)
    }
}

module.exports = {
    post,
}