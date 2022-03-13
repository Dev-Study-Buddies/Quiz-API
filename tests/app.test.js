const supertest = require('supertest')
const app = require('../src/api/app')

const API = supertest(app)

describe('General application tests', () => {
    test('GET request to Root path works', async () => {
        await API
        .get('/')
        .expect(200)
    })
})