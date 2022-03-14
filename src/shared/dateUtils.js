// src: https://stackoverflow.com/a/29774197
const getTodaysDate = () => {
    let todaysDate = new Date()
    const offset = todaysDate.getTimezoneOffset()
    todaysDate = new Date(todaysDate.getTime() - (offset*60*1000))
    return todaysDate.toISOString().split('T')[0]
}

module.exports = {
    getTodaysDate,
}