const jwt = require('jsonwebtoken')
const { Task , User } = require('../models')

const authentication = (req, res, next) => {
    const {access_token} = req.headers
    if(!access_token){
        next({name : 'TOKEN_ERROR'})
        // res.status(404).json({message: "Token not found"})
    }
    else{
        var decode = jwt.verify(access_token, process.env.SECRET)
        req.userData = decode
        console.log(req.userData)
        User.findByPk(req.userData.id)
        .then(data => {
            if(!data){
                next({ name : "NOT_FOUND_ERROR", message: "User not found" })
                // res.status(404).json({message : 'User Not found'})
            }
            else{
                next()
            }
        })
        .catch(err => {
            console.log("invalid user")
            next({ name: "AUTHENTICATION_FAILED" })
            // res.status(401).json({message : err.message})
        })
    }
}

const authorization = (req, res, next) => {
    const {id} = req.params
    const userData = req.userData.id
    console.log(userData, '<<<userdata')
    Task.findOne({
        where: {
            id: id
        }
    })
    .then(data => {
        console.log(data.UserId, userData,'<<<data')
        if(!data){
            next({ name: 'NOT_FOUND_ERROR' , message: 'Data Task Not Found'})
            // res.status(404).json({message : 'Data Task Not Found'})
        } else if(userData !== data.UserId){
            next({ name: 'NOT_FOUND_ERROR' , message: `You don't have access`})
            // res.status(403).json({message : 'You dont have access'})
        } else {
            next()
        }
    })
    .catch(err => {
        next({ name: 'NOT_FOUND_ERROR' , message: 'Data Task Not Found'})
        // res.status(500).json({message : err.message})
    })

}

module.exports = {authentication, authorization}