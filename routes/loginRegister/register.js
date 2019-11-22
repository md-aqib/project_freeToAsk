const dbRegister = require("../../models/register");
const mailer = require("../emailSmsModule/nodemailer");
const jwt = require("jsonwebtoken");

//generate otp
var generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password) {
        res.json({
          success: false,
          msg: "Please enter all details"
        });
    }else{
        dbRegister.findOne({$or: [{ email: req.body.email }, { userName: req.body.userName }]})
            .then(data => {
            if (data) {
                    res.json({
                    success: true,
                    msg: "User name or Email already registered"
                    });
                } else {
                    new dbRegister({
                        name: req.body.name,
                        email: req.body.email,
                        userName: req.body.userName,
                        phone: req.body.phone,
                        password: req.body.password,
                        status: 0,
                        emailVerify: {
                        otp: generateOTP(),
                        verified: false
                        }
                    })
            .save()
            .then(userRegistered => {
              let msg = "Your otp for email verification is :- ";
              if (userRegistered) {
                let token = jwt.sign({email: req.body.email, phone: req.body.phone, userName: req.body.userName},req.app.get("secretKey"),{ expiresIn: "1h" });
                    dbRegister.findOneAndUpdate({ email: req.body.email },{ $set: { token: token } })
                    .then(updated => {
                        mailer.sendMails(userRegistered.email, msg, userRegistered.emailVerify.otp.toString());
                            res.json({
                            success: true,
                            msg: "please verify email",
                            token: token
                            });
                        })
                    .catch(err => console.log(err));
              } else {
                res.json({
                  success: false,
                  msg: "something went wrong"
                });
              }
            })
            .catch(err =>
              res.json({
                success: false,
                msg: "server error",
                err: err
              })
            )
      }
    })
    .catch(err => console.log(err))
    }
}
