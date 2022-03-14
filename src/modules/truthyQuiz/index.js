const quizRouter = require('./http/router')
const quizService = require('./service/service')
const quizDTO = require('./service/dto')
const questionDTO = require('./service/question/dto')
const quizDoc = require('./data/schema')

module.exports = {
    quizRouter,
    quizService,
    quizDTO,
    questionDTO,
    quizDoc
}
