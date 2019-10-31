const mongoose = require('mongoose')
const Schema = mongoose.Schema

const question = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
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
    upvotes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: new Date
            }
        }
    ]
})

module.exports = mongoose.model('question', question)
