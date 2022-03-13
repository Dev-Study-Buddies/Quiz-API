module.exports = class Validation extends Error {
    // https://javascript.info/custom-errors
    constructor(value){
        super(`${value} is not valid!`)
        this.name = "ValidationError"
    }
}