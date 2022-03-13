const {questionDTO} = require('../../../../src/modules/truthyQuiz')

const validText = 'sample text'
const validAnswer = true


describe('When text and answer are...', () => {
    test('...both present and answer is true, then no error', () => {
        const text = validText
        const answer = validAnswer
        expect(() => questionDTO(text, answer)).not.toThrow()
    })

    test('...both present then mapped', () => {
        const text = validText
        const answer = validAnswer
        const quiz = questionDTO(text, answer)

        expect(quiz.text).toBe(validText)
        expect(quiz.answer).toBe(validAnswer)
    })

    test('...both present and answer is true, then no error', () => {
        const text = validText
        const answer = true
        expect(() => questionDTO(text, answer)).not.toThrow()
    })

    test('...both present and answer is false, then no error', () => {
        const text = validText
        const answer = false
        expect(() => questionDTO(text, answer)).not.toThrow()
    })

    test('...both missing, then error', () => {
        expect(() => questionDTO()).toThrow()
    })
})

describe('Text that...', () => {
    test('...is null throws error', () => { 
        const answer = true
        expect(() => questionDTO(answer)).toThrow()
    })

    test('...is undefined throws error', () => { 
        let text
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is empty throws error', () => { 
        const text = ''
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is a number throws error', () => {
        const text = 2
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is an object throws error', () => {
        const text = {text: 'Sample text here'}
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is an array throws error', () => {
        const text = ['sample text']
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is a boolean throws error', () => {
        const text = true
        const answer = true
        expect(() => questionDTO(text, answer)).toThrow()
    })
})

describe('Answer that...', () => {
    test('...is missing throws error', () => { 
        const text = 'sample text'
        expect(() => questionDTO(text)).toThrow()
    })

    test('...is string throws error', () => {
        const text = 'sample text'
        const answer = 'true'
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is number throws error', () => {
        const text = 'sample text'
        const answer = 1
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is object throws error', () => {
        const text = 'sample text'
        const answer = {answer:true}
        expect(() => questionDTO(text, answer)).toThrow()
    })

    test('...is array throws error', () => {
        const text = 'sample text'
        const answer = [true]
        expect(() => questionDTO(text, answer)).toThrow()
    })
})

describe('More than 1 space...', () => {

    test('...between strings is transformed successfully', () => {
        const text = 'sample  text'
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(validText)
    })

    test('...at edges of string is transformed successfully', () => {
        const text = '  sample text  '
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(validText)
    })

    test('...at end of string is transfomed successfully', () => {
        const text = 'sample  text  '
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(validText)
    })

    test('...at beginning of string is transformed successfully', () => {
        const text = '  sample  text'
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(validText)
    })
})

describe('Space...', () => {
    test('...in front of Text is trimmed', () => {
        const text = ' sample text'
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(text.trim())
    })

    test('...at end of Text is trimmed', () => {
        const text = 'sample text '
        const answer = true
        const q = questionDTO(text, answer)
        expect(q.text).toBe(text.trim())
    })
})