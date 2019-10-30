const dbRegister = require('../models/register')
const mailer = require('../routes/emailSmsModule/nodemailer')

var generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = (req, res) => {
    const newOtp = generateOTP()
    dbRegister.findOne({email: req.decoded.email})
    .then(data => {
        if(!data || data ==null){
            res.json({
                success: false,
                msg: 'user not registered'
            })
        }else{
            dbRegister.findOneAndUpdate({email: req.decoded.email}, {$set: {'emailVerify.otp': newOtp}})
            .then(newdata => {
                let subject = 'OTP verify'
                mailer.sendMails(newdata.email, subject, newdata.emailVerify.otp.toString())
                res.json({
                    success: true,
                    msg: 'OTP sent'
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    msg: 'something went wrong',
                    err: err
                })
            })
        }
    })
    .catch(err => {
        res.json({
            success: false,
            msg: 'server error'
        })
    })
}