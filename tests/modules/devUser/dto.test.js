const {devuserDTO} = require('../../../src/modules/devUser')
const ValidationError = require('../../../src/shared/errors/Validation.error')
const {sampleDevuser} = require('../../shared/testData')

test('When API key is missing, throw error', () => {
    const test = () => {
        devuserDTO({email: sampleDevuser.email})
    }

    expect(test).toThrow(ValidationError)
})

test('When email is missing throw error', () => {
    const test = () => {
        devuserDTO({apiKey: sampleDevuser.apiKey})
    }

    expect(test).toThrow(ValidationError)
})

test('API key is hashed when transformed into devuser dto', () => {
    const dto = devuserDTO(sampleDevuser)

    expect(dto.apiKey).not.toBe(sampleDevuser.apiKey)
})