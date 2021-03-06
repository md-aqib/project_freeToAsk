const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile updated
 **/


const register = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    phoneVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    emailVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    status: Number,
    createdAt: {
        type: Date,
        default: new Date()

    },
    token: String
    
})

module.exports = mongoose.model('register', register)