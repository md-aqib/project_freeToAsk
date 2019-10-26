const express = require('express')
const router = express.Router()
const tokenVerify = require('./tokenVerify')


const emailVerify = require('./emailVerify')
router.post('/emailVerify', tokenVerify, emailVerify)

const register = require('./register')
router.post('/register', register)


module.exports = router