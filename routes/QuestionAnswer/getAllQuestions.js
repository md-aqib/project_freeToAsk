const dbQuestion = require('../../models/question')

module.exports = (req, res) => {
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