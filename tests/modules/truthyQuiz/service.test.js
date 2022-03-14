const db = require('../../database/localMongoConnection')
const s = require('../../shared/testData')
const {quizService, quizDoc} = require('../../../src/modules/truthyQuiz')

// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
beforeAll(async () => {
    await db.connect()
})

describe('Saving quizzes that are...', () => {
    test('...valid and result is returned', async () => {
        const result = await quizService.create(s.singleTruthyQuizJSON)

        expect(result.name).toBe(s.singleTruthyQuizJSON.name)
        expect(result.questions[0].text).toBe(s.singleTruthyQuizJSON.questions[0].text)
        expect(result.questions[0].answer).toBe(s.singleTruthyQuizJSON.questions[0].answer)
    })

    test('...missing name,  error is thrown', async () => {
        await expect(() => quizService.create(s.quizQuestions)).rejects.toThrow()
    })

    test('...missing questions, error is thrown', async () => {
        await expect(() => quizService.create(s.quizName)).rejects.toThrow()
    })

    test('...having empty name, error is thrown', async () => {
        await expect(() => quizService.create('', s.quizQuestions)).rejects.toThrow()
    })

    test('...having empty questions, error is thrown', async () => {
        await expect(() => quizService.create(s.quizName, [])).rejects.toThrow()
    })
})

describe('Getting quizzes when...', () => {
    let savedQuizzes = []
    beforeAll(async () => {
        await quizDoc.deleteMany({}).exec()
        
        for(let i=0; i<s.manyTruthyQuizJSON.length; i++){
            savedQuizzes.push(await quizService.create(s.manyTruthyQuizJSON[i]))
        }
    })

    test('...retrieving all', async () => {
        const results = await quizService.retrieveAll()

        // TO-DO: come up with better way to test retrieved objects
        expect(results).toBeDefined()
        expect(results[0].name).toBe(s.manyTruthyQuizJSON[0].name)
        expect(results[1].questions).toHaveLength(4)
    })

    test('...retrieving by valid id', async () => {
        const result = await quizService.retrieveByID(savedQuizzes[2].id)

        expect(result).toEqual(savedQuizzes[2])
    })

    test('...retrieving by non-existent id, and it returns null', async () => {
        const result = await quizService.retrieveByID('620e66e89440d53eaf309a6d')

        expect(result).toBeNull()
    })

    test('...retrieving by invalid id, and it returns null', async () => {
        await expect(() => quizService.retrieveByID('123abc')).rejects.toThrowError()
    })

    test('...retrieving by missing id, and it returns null', async () => {
        await expect(() => quizService.retrieveByID()).rejects.toThrowError()
    })

    test('...retrieving by empty id, and it returns null', async () => {
        await expect(() => quizService.retrieveByID('')).rejects.toThrowError()
    })
})


describe('Updating quizzes when...', () => {
    let savedQuizzes = []

    beforeAll(async () => {
        await quizDoc.deleteMany({}).exec()
        
        for(let i=0; i<s.manyTruthyQuizJSON.length; i++){
            savedQuizzes.push(await quizService.create(s.manyTruthyQuizJSON[i]))
        }
    })

    test('...modifed object is valid and correct id is provided', async () => {
        const newQuizJSON = s.singleTruthyQuizJSON

        const updatedQuiz = await quizService.update(savedQuizzes[1].id, newQuizJSON)

        expect(updatedQuiz.id).toEqual(savedQuizzes[1].id)
        expect(updatedQuiz.name).toEqual(newQuizJSON.name)
        
        for(let i =0; i<newQuizJSON.questions.length; i++){
            expect(updatedQuiz.questions[i].text).toBe(newQuizJSON.questions[i].text)
            expect(updatedQuiz.questions[i].answer).toBe(newQuizJSON.questions[i].answer)
            expect(updatedQuiz.questions[i].text).not.toBe(savedQuizzes[1].questions[i].text)
        }
    })

    test('...modifed object is valid and invalid id provided, throw error', async () => {
        const newQuizJSON = s.singleTruthyQuizJSON
        
        await expect(() => quizService.update('', newQuizJSON)).rejects.toThrowError()
    })

    test('...modifed object is missing name and correct id provided, throw error', async () => {
        const newQuizJSON = {
            name: null,
            questions: s.quizQuestions
        }

        await expect(() => quizService.update(savedQuizzes[1].id, newQuizJSON)).rejects.toThrowError()
    })

    test('...modifed object has invalid name and correct id provided, throw error', async () => {
        const newQuizJSON = {
            name: 'f',
            questions: s.quizQuestions
        }

        await expect(() => quizService.update(savedQuizzes[1].id, newQuizJSON)).rejects.toThrowError()
    })

    test('...modifed object is missing questions and correct id provided, throw error', async () => {
        const newQuizJSON = {
            name: s.quizName,
            questions: null
        }
        
        await expect(() => quizService.update(savedQuizzes[1].id, newQuizJSON)).rejects.toThrowError()
    })

    test('...modifed object has invalid questions and correct id provided, throw error', async () => {
        const newQuizJSON = {
            name: s.quizName,
            questions: [{text:4, answer:'true'}]
        }
        
        await expect(() => quizService.update(savedQuizzes[1].id, newQuizJSON)).rejects.toThrowError()
    })
})

describe('Removing quizzes when...', () => {
    let savedQuizzes = []

    beforeAll(async () => {
        await quizDoc.deleteMany({}).exec()
        
        for(let i=0; i<s.manyTruthyQuizJSON.length; i++){
            savedQuizzes.push(await quizService.create(s.manyTruthyQuizJSON[i]))
        }
    })

    test('...valid id is provided', async () => {
        const id = savedQuizzes[0].id
        const removedQuiz = await quizService.remove(id)
        const result = await quizService.retrieveByID(id)

        expect(removedQuiz.name).toBe(savedQuizzes[0].name)
        expect(result).toBeNull()
    })

    test('...nonexistent id is provided', async () => {
        const id = savedQuizzes[0].id
        const result = await quizService.remove(id)

        expect(result).toBeNull()
    })
})

afterAll(async () => {
    await db.disconnect()
})