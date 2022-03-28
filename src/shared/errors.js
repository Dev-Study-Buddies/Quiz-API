class MissingPropError extends Error {
    constructor(prop){
        super(`Required property ${prop} is missing!`)
        this.name = "MissingPropError"
    }
}

class PropertyValidationError extends Error {
    /**
     * Create errors to indicate invalid data for some object property
     * @param {string} prop The property on an object that fails validation
     * @param {string} [invalidReason = 'unknown'] The reason for invalidation; optional
     */
    constructor(prop, invalidReason = 'unknown'){
        super(`${prop} is invalid\nReason: ${invalidReason}`)
        this.name = "PropertyValidationError"
    }
}

class CompileError extends Error {
    /**
     * Create custom errors to indicate some developer mistake or invalid action
     * @param {string} reason The developer given reason why some operation is invalid
     * @param {string} [errMessage='none'] The original error message thrown by compiler
     */
    constructor(reason, errMessage="None"){
        super(`Reason: ${reason}\nJS Error message: ${errMessage}`)
        this.name = "CompileError"
    }
}

module.exports = {
    MissingPropError,
    PropertyValidationError,
    CompileError
}