const dbQuestion = require('../../models/question')
const dbLogin = require('../../models/userLogin')

module.exports = (req, res) => {
    
    dbLogin.findOne({email: req.decoded.email}, (err, loginData) => {
        console.log(loginData)
        if(err){
            console.log(err)
        }else if(!loginData || loginData == 0){
            res.json({
                success: false,
                msg: 'User not looged in'
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
}

    

 