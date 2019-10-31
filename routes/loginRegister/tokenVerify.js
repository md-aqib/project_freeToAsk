const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    token = req.headers['token']
    if(token){
        jwt.verify(token, req.app.get('secretKey'), (err, decoded) =>{
            if(err){
                res.json({
                    success: false,
                    msg: 'something went wrong'
                })
            }else{
                req.decoded = decoded
                next()
            }
    })
    }
}