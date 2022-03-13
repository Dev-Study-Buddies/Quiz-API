const v = require('./validator')

module.exports = (text, answer) => {

    const newText = v.transformText(text)

    if(v.validateText(newText) && v.validateAnswer(answer))
        return {
            text: newText,
            answer: answer
        }
}
