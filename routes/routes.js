const express = require('express')
const multer = require('multer')
const router = express.Router()
const tokenVerify = require('../strategies/tokenVerify')
const regValidate = require('../validation/registerValidate')
const logValidate = require('../validation/loginValidate')
const changePassVali = require('../validation/changePassVali')



//multer, file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './loginRegister/pictures')
    },
    filename: function (req, file, cb) {
      cb(null, 'img' + Date.now() + '' + file.originalname)
    }
  })
  var upload = multer({ storage: storage }).single('avatar')

  router.post('/profile', tokenVerify, function (req, res, next) {
    upload(req, res, (err) => {
        if(err) console.log(err)
        res.send('file uploaded')
    })
  })




// register, login, profile update route
const register = require('./loginRegister/register')
router.post('/register', regValidate, register)

const emailVerify = require('./loginRegister/emailVerify')
router.post('/emailVerify', tokenVerify, emailVerify)

const resend = require('./loginRegister/resend')
router.post('/resend', tokenVerify, resend)

const login = require('./loginRegister/loginLogout')
router.post('/login', logValidate, login.login)

const logout = require('./loginRegister/loginLogout')
router.post('/logout', tokenVerify, logout.logout)

const profile = require('./loginRegister/updateProfile')
router.put('/profileUpdate', tokenVerify, profile)

const profileData = require('./loginRegister/profileData')
router.post('/profileData', tokenVerify, profileData)

//change and forgot password route
router.post('/changepassword',changePassVali, tokenVerify, require('./loginRegister/changeForgot').changePass)
router.post('/forgotpassword', require('./loginRegister/changeForgot').forgotPass)

//Question Answer Upvote Downvote route
router.post('/question', tokenVerify, require('./QuestionAnswer/question'))
router.post('/answer/:questionId', tokenVerify, require('./QuestionAnswer/answer'))

router.post('/upvotes/:answerId', tokenVerify, require('./QuestionAnswer/upDownvotes').upvote)
router.post('/downvotes/:answerId', tokenVerify, require('./QuestionAnswer/upDownvotes').downvote)

//Get APIs
router.post('/getQuestions',tokenVerify, require('./QuestionAnswer/getAllQuestions'))
router.post('/getAnsById/:questionId', tokenVerify, require('./QuestionAnswer/ansbyquesId'))





module.exports = router