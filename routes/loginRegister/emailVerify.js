const dbRegister = require('../../models/register')
const dbLogin = require('../../models/userLogin')
const dbProfile = require('../../models/profile')
const nodeMailer = require('../emailSmsModule/nodemailer')
const emailData = require('../../common/emailData')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const saltRounds = 8


module.exports = (req, res) => {
    if(!req.body.emailOtp){
        res.json({
            success: false,
            msg: 'please enter 6 digit otp'
        })
    }else{
        dbRegister.findOne({email: req.decoded.email})
        .then(registeredData => {
            if(!registeredData || registeredData == null){
                res.json({
                    success: false,
                    msg: 'Please register first'
                })
            }else if(registeredData.emailVerify.otp == req.body.emailOtp){
                login = new dbLogin({
                    name: registeredData.name,
                    phone: registeredData.phone,
                    email: registeredData.email,
                    userName: registeredData.userName,
                    password: registeredData.password,
                    status: 1,
                    createdAt: new Date()
                })
                bcrypt.hash(registeredData.password, saltRounds)
                .then((hash) => {
                    login.password = hash
                    login.save()
                    .then(loginData => {
                        new dbProfile({
                            name: registeredData.name,
                            phone: registeredData.phone,
                            email: registeredData.email,
                            userName: registeredData.userName,
                            status: 2,
                            createdAt: new Date()
                        })
                        .save()
                        .then(profileData => {
                            dbRegister.findOneAndUpdate({email: req.decoded.email}, { $set: { status: 1, 'emailVerify.verified': true, 'emailVerify.verifiedAt': new Date() } })
                            .then(data=> {
                                let emailObj = emailData.welcomeEmail(data.name)
                                ejs.renderFile('./views/index.ejs', emailObj, (err, html) => {
                                    if(err){
                                        res.json({
                                            success: false
                                        })
                                    }else{
                                        let subject = 'welcome to Aqibweb'
                                        nodeMailer.sendMails(data.email, subject , html)
                                        res.json({
                                            success: true,
                                            msg: 'user Successfully registered'
                                        })
                                    }
                                })
                            })
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }else{
                res.json({
                    success: false,
                    msg: 'Incorrect OTP'
                })
            }
        })
        .catch(err =>
            res.json({
                success: false,
                msg: 'Server Error'
            }) )
    }
}
