const express = require('express')
const router = express.Router()
const tokenVerify = require('./tokenVerify')



const register = require('./register')
router.post('/register', register)

const resend = require('./resend')
router.post('/resend', tokenVerify, resend)

const emailVerify = require('./emailVerify')
router.post('/emailVerify', tokenVerify, emailVerify)

const login = require('./loginLogout')
router.post('/login', login.login)

const logout = require('./loginLogout')
router.post('/logout', tokenVerify, logout.logout)

const profile = require('./updateProfile')
router.post('/profile', tokenVerify, profile)




module.exports = router