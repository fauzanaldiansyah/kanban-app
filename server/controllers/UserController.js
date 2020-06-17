const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');

class UserController{

    static register(req,res,next){
        const newUser = {
            email : req.body.email,
            password : req.body.password,
            organization : req.body.organization
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json({email: data.email, organization: data.organization, password: data.password })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }

    static login(req,res,next){
        const login = {
            email : req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: login.email
            }
        })
        .then(data => {
            if(data && bcrypt.compareSync(login.password, data.password)){
                const access_token = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.SECRET)
                console.log('access_token>>>>>> ', access_token)
                res.status(200).json({access_token})
            }
            else{
                next({ name: 'AUTHENTICATION_FAILED' })
            }
        })
        .catch(err => {
            next({ name: 'AUTHENTICATION_FAILED' })
        })
    }

    static googlesign(req, res, next){
        let { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            email = ticket.getPayload().email
                return User.findOne({
                    where: {
                        email
                    }
                })
        })
        .then(data => {
            if(data){
                let payload = {
                    id: data.id,
                    email: data.email
                }
                return payload
            }
            else{
                return User.create({
                    email, password: 'google123'
                })
            }
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            let token = jwt.sign(payload, process.env.SECRET)
            console.log(payload,token)
            return res.status(201).json({
                data: {
                    email : data.email,
                    id: data.id,
                    access_token: token
                }
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

}

module.exports = UserController