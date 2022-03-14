const {getTodaysDate} = require('../src/shared/dateUtils')

test('Check if getTodaysDate() returns date in format of YYYY-MM-DD', () => {
    const todaysDate = getTodaysDate()
    expect(todaysDate).toMatch(/\d{4}-\d{2}-\d{2}/)
})