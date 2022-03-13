module.exports = class Timeout extends Error {
    constructor(msg){
        super(`${msg}`)
        this.name = "TimeoutError"
    }
}