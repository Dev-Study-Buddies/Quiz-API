const mongoose = require('mongoose')
const {getTodaysDate} = require('../../../shared/dateUtils')

const devuserSchema = new mongoose.Schema({
    key: {
        type:String,
        required: true,
        // Note: i don't think unique validation is needed
        //     because API_KEY is generated to ensure uniqueness
    },
    // src: https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
    email: {
        type: String,
        required: true,
        // eslint-disable-next-line no-useless-escape
        match: /.+\@.+\..+/,
        unique: true
    },
    accessDate:{
        type: String,
        default: getTodaysDate(),
    },
    usage: {
        type: Number,
        default: 0
    }
})

const devuserToJSON = (doc, result) => {
    result.id = result._id.toString()
    delete result._id
    delete result.__v
}

devuserSchema.set('toJSON', {transform: devuserToJSON})

module.exports = mongoose.model('DevUser', devuserSchema)