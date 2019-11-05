const dbQuestion = require('../../models/question')
const dbLogin = require('../../models/userLogin')



module.exports = (req, res) => {
    dbLogin.findOne({email: req.decoded.email})
    .then(loginData => {
        console.log(loginData)
        if(!loginData || loginData == 0){
            res.json({
                success: false,
                msg: 'Unathorised user'
            })
        }else{
            if(!req.body.textone || !req.body.texttwo){
                res.json({
                    success: false,
                    msg: 'please enter the question details'
                })
            }else{
                new dbQuestion({
                    user: loginData._id,
                    email: loginData.email,
                    textone: req.body.textone,
                    texttwo: req.body.texttwo,
                    name: loginData.name
                })
                .save()
                .then(questionData => {
                    res.json({
                        success: true,
                        msg: 'question updated',
                        questions: questionData
        
                    })
                })
                .catch(err => {
                    res.json({
                        success: false,
                        msg: 'error in update question'
                    })
                })
            }
            }
    })
    .catch(err => {
        res.json({
            success: false,
            msg: ''
        })
    })
}


