const ValidationError = require('../../../../shared/errors/Validation.error')

const validateText = text => {
    // https://stackoverflow.com/a/21722204
    const anyWordOnlyOneSpace = /^(\S+\s)*\S+$/

    if(!text || text.length === 0)
        throw new ValidationError('text')

    if(!text.match(anyWordOnlyOneSpace))
        throw new ValidationError('text')

    return true
}

const transformText = text => {
    const matchMoreThan1SpaceAnywhere = /\s{2,}/
    const transformedText = text.trim()

    return transformedText.replace(matchMoreThan1SpaceAnywhere, ' ')
}

const validateAnswer = answer => {
    if(answer === undefined || answer === null)
        throw new ValidationError('answer')

    if(typeof answer != 'boolean')
        throw new ValidationError('answer')

    return true
}

module.exports = {
    validateText,
    transformText,
    validateAnswer
}