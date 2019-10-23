const express = require('express')
const router = express.Router()
const tokenVerify = require('./tokenVerify')


const register = require('./register')
router.post('/register', register)


module.exports = router