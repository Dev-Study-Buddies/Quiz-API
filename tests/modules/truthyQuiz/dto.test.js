const {quizDTO, questionDTO} = require('../../../src/modules/truthyQuiz')

const validName = "Sample Name"
const validQuestions = [
    questionDTO('one', true),
    questionDTO('two', false),
    questionDTO('three', true),
    questionDTO('four', false),
]

describe('When name and questions are...', () => {
    test('...both present, then no error', () => {
        const name = validName
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).not.toThrow()
    })

    test('...both present, then is mapped to DTO', () => {
        const name = validName
        const questions = validQuestions
        const quiz = quizDTO(name, questions)

        expect(quiz.name).toBe(validName)

        for(let i = 0; i < validQuestions.length; i++){
            expect(quiz.questions[i]).toEqual(validQuestions[i])
        }
    })

    test('...both present, then is mapped to DTO, CASE #2', () => {
        const name = validName
        const questions = validQuestions
        const quiz = quizDTO(name, questions)

        expect(quiz.name).toBe(validName)
        expect(quiz.questions).toContainEqual(validQuestions[0])
    })

    test('...both present, then is mapped to DTO, CASE #3', () => {
        const name = validName
        const questions = validQuestions
        const quiz = quizDTO(name, questions)

        expect(quiz.name).toBe(validName)
        expect(quiz.questions).toEqual(validQuestions)
    })

    test('...both are JSON then no error', () => {
        const JSONBody = {
            name: 'sample name',
            questions: [
                {text: 'sample text', answer: true}
            ]
        }

        expect(() => quizDTO(JSONBody.name, JSONBody.questions)).not.toThrow()
    })

    test('...both are JSON, then is mapped to DTO', () => {
        const JSONBody = {
            name: 'Sample Name',
            questions: [
                {text: 'sample text', answer: true}
            ]
        }

        const quiz = quizDTO(JSONBody.name, JSONBody.questions)

        expect(quiz.name).toBe(validName)
        expect(quiz.questions).toContainEqual({text: 'sample text', answer: true})
    })

    test('...both undefined, then error', () => {
        const name = ''
        const questions = []

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...both missing, then error', () => {
        const name = ''
        const questions = []

        expect(() => quizDTO(name, questions)).toThrow()
    })
})

describe('Name that...', () => {
    test('...is null throws error', () => {
        const questions = validQuestions

        expect(() => quizDTO(questions)).toThrow()
    })

    test('...is undefined throws error', () => {
        let name 
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is empty throws error', () => {
        const name = ''
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is invalid due to illegal characters throws error', () => {
        const name = '$^#$^$#%'
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is invalid due to not enough characters throws error', () => {
        const name = 'qs'
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is invalid due to newline throws error', () => {
        const name = `Sample Name
        New characters`
        const questions = validQuestions


        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is invalid due to extra spaces throws error', () => {
        // To-Do: I wanted to validate for tabs
        // However, it seems that error is thrown for just 2 spaces and more
        // Need to fix
        const name = `Sample Name      New characters`
        const questions = validQuestions


        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is a number throws error', () => {
        const name = 1
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is a boolean throws error', () => {
        const name = true
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is an object throws error', () => {
        const name = {name: 'sample name'}
        const questions = validQuestions

        expect(() => quizDTO(name, questions)).toThrow()
    })
})

describe('Question that...', () => {
    test('...is null, throws error', () => {
        const name = validName
        expect(() => quizDTO(name)).toThrow()
    })

    test('...is undefined, throws error', () => {
        const name = validName
        let questions 
        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is empty, throws error', () => {
        const name = validName
        const questions = []
        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is an object with multiple questions, throws error', () => {
        const name = validName
        const questions = {
            0: questionDTO('one', true),
            1: questionDTO('two', false),
            2: questionDTO('three', true),
            3: questionDTO('four', false),
        }

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is an object that is a single question, throws error', () => {
        const name = validName
        const questions = questionDTO('one', true)

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is a question that is missing the text, throws error', () => {
        const name = validName
        const questions = [
            {answer:true},
            questionDTO('two', false)
        ]

        expect(() => quizDTO(name, questions)).toThrow()
    })

    test('...is a question that is missing the answer, throws error', () => {
        const name = validName
        const questions = [
            {text:'sample-text'},
            questionDTO('two', false)
        ]

        expect(() => quizDTO(name, questions)).toThrow()
    })
})