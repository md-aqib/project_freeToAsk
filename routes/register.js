const dbRegister = require('../models/register')
const dbLogin = require('../models/userLogin')
const mailer = require('./emailandsmsmodule/nodemailer')


//generate otp
var generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = (req, res) => {
    dbRegister.findOne({email: req.body.email})
    .then(data => {
        if(data){
            res.json({
                success: true,
                msg: 'User already registered'
            })
        }else{
            if(!req.body.name || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password){
                res.json({
                    success: false,
                    msg: 'Please enter all details'
                })
            }else{
                new dbRegister({
                    name: req.body.name,
                    email: req.body.email,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    password: req.body.password,
                    status: 0,
                    // phoneVerify: {
                    //     otp: generateOTP(),
                    //     verified: false,
                    // },
                    emailVerify: {
                        otp: generateOTP(),
                        verified: false
                    }
        
                })
                .save()
                .then(userRegistered => {
                    if(userRegistered){
                        mailer.sendMails(userRegistered.email, 'email verification', userRegistered.emailVerify.otp.toString())
                        res.json({
                            success: true,
                            msg: 'please verify email'
                        })
                    }else{
                        res.json({
                            success: false,
                            msg: 'something went wrong'
                        })
                    }
                    
                })
                .catch(err => console.log(err))
            }
        }
    })
    .catch(err => console.log(err))
}