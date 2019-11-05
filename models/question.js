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
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('question', question)
