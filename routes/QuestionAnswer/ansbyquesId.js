const dbAns = require('../../models/answer')
const dbQuestion = require('../../models/question')


module.exports = (req, res) => {
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