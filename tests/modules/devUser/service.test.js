const db = require('../../database/localMongoConnection')
const s = require('../../shared/testData')
const {devuserService, devuserDoc} = require('../../../src/modules/devUser')

beforeAll(async () => {
    await db.connect()
})


describe('Creating devusers', () => {
    test('devuserService.create() saves devuser to database', async () => {
        const result = await devuserService.create(s.sampleDevuser);
        expect(result.id).toBeTruthy()
        expect(result.key).toBeTruthy()
        expect(result.email).toBeTruthy()
        expect(result.accessDate).toBeTruthy()
        expect(result.usage).toBe(0)
    })
})

describe('Retrieving devusers', () => {

    let savedDevuser

    beforeAll(async() => {
        await devuserDoc.deleteMany({}).exec()

        savedDevuser = await devuserService.create(s.sampleDevuser)
    })

    test('devuserService.retrieveById() returns correct devuser', async () => {
        const result = await devuserService.retrieveByID(savedDevuser.id)

        expect(result.id).toBeTruthy()
        expect(result.key).toBeTruthy()
        expect(result.email).toBeTruthy()
        expect(result.accessDate).toBeTruthy()
        expect(result.usage).toBe(0)
    })

    test('devuserService.retrieveAll() returns all devusers', async () => {
        const results = await devuserService.retrieveAll()

        expect(results).toHaveLength(1)
    })
})

describe('Removing devusers', () => {
    let savedDevuser

    beforeAll(async() => {
        await devuserDoc.deleteMany({}).exec()

        savedDevuser = await devuserService.create(s.sampleDevuser)
    })

    test('devuserService.remove() deletes devuser', async () => {
        const result = await devuserService.remove(savedDevuser.id)
        const results = await devuserService.retrieveAll()

        expect(result).toBeTruthy()
        expect(results).toBeNull()
    })
})

describe('Updating devusers', () => {
    let savedDevuser

    beforeAll(async() => {
        await devuserDoc.deleteMany({}).exec()

        savedDevuser = await devuserService.create(s.sampleDevuser)
    })

    test('devuserService.update() updates devuser', async () => {
        const newDevuser = {
            apiKey: 'abc',
            email: 'test@yahoo.com'
        }

        const result = await devuserService.update(savedDevuser.id, newDevuser)

        expect(result.id).toBe(result.id)
        expect(result.key).not.toBe(savedDevuser.key)
        expect(result.email).not.toBe(savedDevuser.email)
    })
})

describe('devuserService.genKey() produces API key', () => {
    test('genKey() produces key in format of a-z0-9 with 30 char length', () => {
        const test = devuserService.genKey()
        expect(/^([a-z\d]){30}$/gm.test(test)).toBeTruthy()
    })
})

afterAll(async () => {
    await db.disconnect()
})