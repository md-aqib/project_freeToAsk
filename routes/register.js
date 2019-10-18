const express = require('express')
const dbRegister = require('../models/register')
dbLogin = require('../models/userLogin')


//generate otp
var generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = (req, res) => {
    dbRegister.findOne({$or: [{email: req.body.email}, {phone: req.body.phone}, {userName: req.body.userName}]})
    .then(data => {
        if(data){
            res.json({
                success: true,
                msg: 'User already registered'
            })
        }else{
            if(!req.body.name || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password){
                res.json({
                    success: false,
                    msg: 'Please enter all details'
                })
            }else{
                new dbRegister({
                    name: req.body.name,
                    email: req.body.email,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    password: req.body.password
        
                })
                .save()
                .then(userRegistered => {
                    res.json({
                        success: true,
                        msg: 'User Registered Successfully'
                    })
                })
                .catch(err => console.log(err))
            }
        }
    })
    .catch(err => console.log(err))
}