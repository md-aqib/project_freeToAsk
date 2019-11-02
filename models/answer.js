const mongoose = require('mongoose')
const Schema = mongoose.Schema

answer = new Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: String,
    text:{
        type: String,
            },   
    name:{
        type: String
        },
    upvotes: [String],
    downvotes: [String],
    date: {
        type: Date,
        default: new Date
        }
})

module.exports = mongoose.model('answer', answer)