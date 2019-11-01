const dbRegister = require('../../models/register')
const mailer = require('../emailSmsModule/nodemailer')
const jwt = require('jsonwebtoken')


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
                    let msg = "Your otp for email verification is :- "
                    if(userRegistered){
                        let token = jwt.sign({ email: req.body.email, phone: req.body.phone }, req.app.get("secretKey"))
                        mailer.sendMails(userRegistered.email, msg, userRegistered.emailVerify.otp.toString())
                        res.json({
                            success: true,
                            msg: 'please verify email',
                            token: token
                        })
                    }else{
                        res.json({
                            success: false,
                            msg: 'something went wrong'
                        })
                    }
                    
                })
                .catch(err =>
                    res.json({
                        success: false,
                        msg: 'server error',
                        err: err
                    }))
            }
        }
    })
    .catch(err => console.log(err))
}