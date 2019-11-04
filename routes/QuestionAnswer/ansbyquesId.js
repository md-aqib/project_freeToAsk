const dbAns = require('../../models/answer')
const dbQuestion = require('../../models/question')
const dbLogin = require('../../models/userLogin')


module.exports = (req, res) => {

    dbLogin.findOne({email: req.decoded.email})
    .then(loginData => {
        if(!loginData || loginData == 0){
            res.json({
                success: false,
                msg: 'User not logged in'
            })
        }else{
            dbAns.findOne({question: req.params.questionId})
            .then(answers => {
                res.json({
                    success: false,
                    msg: 'All the answers of given Question Id',
                    ans: answers
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    msg: 'Something went wrong, please try again',
                    err: err
                })
            })
        }
    })

    .catch(err => console.log(err))

}