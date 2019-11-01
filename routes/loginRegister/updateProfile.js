const dbProfile  = require('../../models/profile')
const dbLogin = require('../../models/userLogin')

module.exports = (req, res) => {
    dbLogin.find({email: req.decoded.email, phone: req.decoded.phone})
    .then(loginData => {
        if(!loginData || loginData == null){
            res.json({
                success: false,
                msg: 'User details does not exists'
            })
        }else{
            dbProfile.find({email: req.decoded.email, phone: req.decoded.phone})
            .then(profileData => {
                if(!profileData || profileData == null){
                    res.json({
                        success: false,
                        msg: "You haven't registered or completed the registration process yet."
                    })
                }else{
                    const profile = {
                        name: profileData.name,
                        user_type: req.body.userType,
                        portfolio: req.body.portfolio,
                        status: 3
                    }
                    dbProfile.findOneAndUpdate({email: email}, {$set: {profile}})
                    .then(profileUpdated => {
                        res.json({
                            success: true,
                            msg: 'Profile Updated',
                            profileUpdated: profileUpdated
                        })
                    })
                    .catch(err =>{
                        res.json({
                            success: false,
                            msg: 'Error in Profile Update',
                            err: err
                        })
                    })
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
            msg: 'Data not Found, Please try again',
            err: err
        })
    })
}