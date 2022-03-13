const v = require('./validator')

module.exports = (name, questions) => {

    const newName = v.transformName(name)
    const newQuestions = v.transformQuestions(questions)
    const quiz = {
        name: newName,
        questions: newQuestions
    }

    if(v.validateName(quiz.name) && v.validateQuestions(quiz.questions))
        return quiz
}


