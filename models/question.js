const mongoose = require('mongoose')
const Schema = mongoose.Schema

const question = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: String,
    textone: {
        type: String,
        required: true
    },
    texttwo: {
        type: String,
        required: true
    },
    name: {
        type: String,
    }
})

module.exports = mongoose.model('question', question)
