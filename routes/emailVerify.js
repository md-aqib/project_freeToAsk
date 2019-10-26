dbRegister = require('../models/register')
dbLogin = require('../models/userLogin')
dbProfile = require('../models/profile')
nodeMailer = require('./emailandsmsmodule/nodemailer')


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
                new dbLogin({
                    name: registeredData.name,
                    phone: registeredData.phone,
                    email: registeredData.email,
                    userName: registeredData.userName,
                    password: registeredData.password,
                    status: 1,
                    createdAt: new Date()
                })
                .save()
                .then(loginData => {
                    new dbProfile({
                        name: registeredData.name,
                        phone: registeredData.phone,
                        email: registeredData.email,
                        userName: registeredData.userName,
                        password: registeredData.password,
                        status: 1,
                        createdAt: new Date()
                    })
                    .save()
                    .then(profileData => {
                        console.log('profileData', profileData)
                    })
                    .catch(err => console.log(err))
                })
                    .catch(err => console.log(err))
                    dbRegister.findOneAndUpdate({email: req.decoded.email}, { $set: { status: 1, 'emailVerify.verified': true, 'emailVerify.verifiedAt': new Date() } })
                    .then(data=> {
                        res.json({
                            success: true,
                            msg: 'user Successfully registered'
                        })
                    })
                    .catch(err =>
                        res.json({
                            success: false,
                            msg: 'something went wrong',
                            err : err
                        }))
            }
        })
        .catch(err =>
            res.json({
                success: false,
                msg: 'Incorrect Otp'
            }) )
    }
}
