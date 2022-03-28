const {genKey} = require('../../../src/modules/devUser/service/apiKey')

// TODO: test hashAPIKey()

describe('devuserService.genKey() produces API key', () => {
    test('genKey() produces key in format of a-z0-9 with 30 char length', () => {
        const test = genKey()
        expect(/^([a-z\d]){30}$/gm.test(test)).toBeTruthy()
    })
})