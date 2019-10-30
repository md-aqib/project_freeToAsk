const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile Updated
 **/


const profile = new Schema({
    useName: String,
    name: String,
    email: String,
    profilePic: {
        type: String
    },
    user_type: {
        type: String,
        enum: ['student', 'working']
    },
    portfolio: [String],
    createdAt: Date,
    updatedAt: [Date],
    status: Number
})

module.exports = mongoose.model('profile', profile)