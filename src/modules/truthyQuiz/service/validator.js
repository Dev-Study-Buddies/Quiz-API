const mapQuestion = require('./question/dto')
const ValidationError = require('../../../shared/errors/Validation.error')

const validateName = name => {
    if(!name || name.length === 0)
        throw new ValidationError('name')

    // https://stackoverflow.com/a/21722204
    const alphaNumNoNewLineNoTab = /^(\w+\s)*\w+$/
        
    if(!name.match(alphaNumNoNewLineNoTab) || name.length < 5)
        throw new ValidationError('name')

    return true
}

// to-do: Add sanitations (remove characters, extra spaces, etc)
// Need to consult user requirements for details on this
const transformName = name => {
    return name.trim()
}

const validateQuestions = questions => {
    if(!questions)
        throw new ValidationError('questions')

    if(!Array.isArray(questions))
        throw new ValidationError('questions')

    if(questions.length === 0)
        throw new ValidationError('questions')

    return true
}

const transformQuestions = questions => {
    if(!questions) throw new ValidationError('questions')
    return questions.map(q => mapQuestion(q.text, q.answer))
}

module.exports = {
    validateName,
    validateQuestions,
    transformName,
    transformQuestions
}