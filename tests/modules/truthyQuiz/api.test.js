const supertest = require('supertest')
const app = require('../../../src/api/app')
const {quizDoc, quizService} = require('../../../src/modules/truthyQuiz')
const db = require('../../database/localMongoConnection')
const s = require('../../shared/sampleData')

const API = supertest(app)
const quizEndpoint = '/api/quizzes'

// https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
beforeAll(async () => {
    await db.connect()
})

describe('Quiz - POST', () => {
    beforeAll( async() => {
        await quizDoc.deleteMany({})
    })

    test('Success: valid POST request', async () => {
        await API
            .post(quizEndpoint)
            .send(s.singleTruthyQuizJSON)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Success: valid POST request -- quiz properties are defined', async () => {
        const res = await API
            .post(quizEndpoint)
            .send(s.singleTruthyQuizJSON)

        expect(res.body.id).toBeTruthy()
        expect(res.body.name).toBeTruthy()
        expect(res.body.questions).toBeTruthy()
    })

    test('Error: invalid POST request -- missing questions', async () => {
        await API
            .post(quizEndpoint)
            .send({name:'test'})
            .expect(400)
    })

    test('Error: invalid POST request -- missing name', async () => {
        await API
            .post(quizEndpoint)
            .send({questions: s.quizQuestions})
            .expect(400)
    })
})

describe('Quiz - GET', () => {
    let quizIds = []

    beforeAll( async() => {
        await quizDoc.deleteMany({})
        for(let i = 0; i<s.manyTruthyQuizJSON.length; i++){
            const quiz = await quizService.create(s.manyTruthyQuizJSON[i])
            quizIds.push(quiz.id)
        }
    })

    test('Success: retrieve all quizzes', async() => {
        await API
            .get(quizEndpoint)
            .expect(200)
    })

    test('Success: retrieve all quizzes - expected number of entities returned', async() => {
        const res = await API.get(quizEndpoint)

        expect(res.body).toHaveLength(s.manyTruthyQuizJSON.length)
    })

    test('Success: retrieve all quizzes - returned quiz entities are valid', async() => {
        const res = await API.get(quizEndpoint)

        res.body.forEach( q => {
            expect(q.id).toBeTruthy()
            expect(q.name).toBeTruthy()
            expect(q.questions).toBeTruthy()
        })
    })

    test('Success: retrieve quiz by id', async () => {
        await API
            .get(`${quizEndpoint}/${quizIds[0]}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Error: retrieve quiz by invalid object id', async () => {
        await API
            .get(`${quizEndpoint}/test`)
            .expect(400)
    })

    // TODO: Add tests to verify API returns 404
    // test('Error: retrieve quiz by non-existent object id', async () => {
    //     await API
    //     .get(`${quizEndpoint}/${}`)
    //     .expect(400)
    // })
})

describe('Quiz - DELETE', () => {
    let quizIds = []

    beforeAll(async () => {
        await quizDoc.deleteMany({})
        for(let i = 0; i<s.manyTruthyQuizJSON.length; i++){
            const quiz = await quizService.create(s.manyTruthyQuizJSON[i])
            quizIds.push(quiz.id)
        }
    })

    test('Success: Quiz is removed', async () => {
        await API
            .delete(`${quizEndpoint}/${quizIds[0]}`)
            .expect(204)
    })

    test('Error: Invalid id', async () => {
        await API
            .delete(`${quizEndpoint}/${quizIds[0]}`)
            .expect(404)
    })

    test('Error: Invalid id - Object with ID already removed', async () => {
        await API
            .delete(`${quizEndpoint}/${quizIds[0]}`)
            .expect(404)
    })
})

describe('Quiz - PUT', () => {
    let quizIds = []

    beforeAll(async () => {
        await quizDoc.deleteMany({})
        for(let i = 0; i<s.manyTruthyQuizJSON.length; i++){
            const quiz = await quizService.create(s.manyTruthyQuizJSON[i])
            quizIds.push(quiz.id)
        }
    })

    test('SUCCESS: Valid parameters', async () => {
        const newQuizJSON = {
            name: 'New Quiz Name',
            questions: [
                {
                    text: "new question text",
                    answer: true
                }
            ]
        }

        const res = await API
            .put(`${quizEndpoint}/${quizIds[0]}`)
            .send(newQuizJSON)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.id).toBe(quizIds[0])
    })

    test('ERROR: Invalid Parameters', async () => {
        await API
            .put(`${quizEndpoint}/${quizIds[0]}`)
            .send(null)
            .expect(400)
    })

    test('ERROR: Invalid Parameters  -- missing name', async () => {
        const newQuizJSON = {
            questions: [
                {
                    text: "new question text",
                    answer: true
                }
            ]
        }

        await API
            .put(`${quizEndpoint}/${quizIds[0]}`)
            .send(newQuizJSON)
            .expect(400)
    })

    test('ERROR: Invalid Parameters  -- missing questions', async () => {
        const newQuizJSON = {
            name: "test name"
        }

        await API
            .put(`${quizEndpoint}/${quizIds[0]}`)
            .send(newQuizJSON)
            .expect(400)
    })

    test('ERROR: Invalid Parameters  -- missing questions content', async () => {
        const newQuizJSON = {
            name: 'New Quiz Name',
            questions: []
        }

        await API
            .put(`${quizEndpoint}/${quizIds[0]}`)
            .send(newQuizJSON)
            .expect(400)
    })
})

afterAll(async () => {
    await db.disconnect()
})