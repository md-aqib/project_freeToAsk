const dbProfile  = require('../../models/profile')
const dbLogin = require('../../models/userLogin')

module.exports = (req, res) => {
    dbLogin.findOne({email: req.decoded.email})
    .then(loginData => {
        if(!loginData || loginData == null){
            res.json({
                success: false,
                msg: 'User details does not exists'
            })
        }else{
            dbProfile.findOne({email: req.decoded.email})
            .then(profileData => {
                if(!profileData || profileData == null){
                    res.json({
                        success: false,
                        msg: "You haven't registered or completed the registration process yet."
                    })
                }else{
                    const object = { 
                                    bio: req.body.bio,
                                    userType: req.body.userType,
                                    portfolio: req.body.portfolio,
                                    status: 3
                                }
                        
                    dbProfile.findOneAndUpdate({email: req.decoded.email}, {$set: object})
                    .then(profileUpdated => {
                        if(profileUpdated){
                            dbProfile.findOne({email: req.decoded.email})
                            .then(profileData => {
                                res.json({
                                    success: true,
                                    msg: 'Profile Updated',
                                    newData: profileData
                                })
                            })
                            .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    msg: 'Profile Data not Found, Please try again',
                    err: err
                })
            })
        }
    })
    .catch(err => {
        res.json({
            success: false,
            msg: 'loginData not Found, Please try again',
            err: err
        })
    })
}