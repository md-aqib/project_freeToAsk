const dbQuestion = require('../../models/question')
const dbLogin = require('../../models/userLogin')

module.exports = (req, res) => {
    
    dbLogin.finOne({email: req.decoded.email})
    .then(loginData => {
        if(!loginData || loginData == null){
            res.json({
                success: false,
                msg: 'user not logged in'
            })
        }else{
            dbQuestion.find({}, (err, questions) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'something went wrong'
                    })
                }else{
                    res.json({
                        success: true,
                        msg: 'All Questions',
                        allQuestions: questions
                    })
                }
            })
        }
    })

    .catch(err => console.log(err))
}