const mongoose = require('mongoose')

const quiz = require('../service/validator')
const question = require('../service/question/validator')


const quizSchema = new mongoose.Schema({
    name: {
        type:String,
        validate: quiz.validateName
    },
    questions: [{
        text: {
            type: String,
            validate: question.validateText
        },
        answer: {
            type: Boolean,
            validate: question.validateAnswer
        }
    }],
})

const quizToJSON = (doc, result) => {
    result.id = result._id.toString()
    result.questions.forEach(questionToJSON)
    delete result._id
    delete result.__v
}

const questionToJSON = q => {
    q.id = q._id.toString()
    delete q._id
    delete q.__v
}

quizSchema.set('toJSON', {transform: quizToJSON})


module.exports = mongoose.model('Quiz', quizSchema)