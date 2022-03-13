/* eslint-disable no-ex-assign */
const quizService = require('../service/service')
const logger = require('../../../shared/logger')
const ValidationError = require('../../../shared/errors/Validation.error')

const getAll = async (req, res, next) => {
    try{
        const resultset = await quizService.retrieveAll()
        if(!resultset) throw new Error('Resource not found')
        res.json(resultset)
    } catch (err){
        if(err.name === 'TypeError') err = new ValidationError('quiz')
        logger.error(`Error in quiz.controller.post\n: ${err}`)
        next(err)
    }
}

const getById = async (req, res, next) => {
    try{
        const resultset = await quizService.retrieveByID(req.params.id)
        if(!resultset) throw new Error('Resource not found')
        res.json(resultset)
    } catch(err){
        if(err.name === 'TypeError') err = new ValidationError('quiz')
        logger.error(`Error in quiz.controller.post\n: ${err}`)
        next(err)
    }
}

const post = async (req, res, next) => {
    try{
        logger.debug(`incoming data: \n ${JSON.stringify(req.body)}`)
        res.json(await quizService.create(req.body))
    } catch(err){
        if(err.name === 'TypeError') err = new ValidationError('quiz')
        logger.error(`Error in quiz.controller.post\n: ${err}`)
        next(err)
    }
}


const remove = async (req, res, next) => {
    try{
        const result = await quizService.remove(req.params.id)
        return result ? res.status(204).json(result) : res.status(404).end()
    } catch(err){
        if(err.name === 'TypeError') err = new ValidationError('quiz')
        logger.error(`Error in quiz.controller.post\n: ${err}`)
        next(err)
    }
}

const put = async (req, res, next) => {
    try{
        res.json(await quizService.update(req.params.id, req.body))
    } catch(err){
        if(err.name === 'TypeError') err = new ValidationError('quiz')
        logger.error(`Error in quiz.controller.post\n: ${err}`)
        next(err)
    }
}

module.exports = {
    getAll,
    getById,
    post,
    remove,
    put
}