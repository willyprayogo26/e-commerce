const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)

class UserController {
    static register(req, res) {
        User.create({
            ...req.body,
            role: 'customer'
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            if(err.errors.fullName) {
                res.status(400).json({
                    message: err.errors.fullName.message
                })
            } else if(err.errors.email) {
                if(err.errors.email.message == 'Email has been used') {
                    res.status(409).json({
                        message: err.errors.email.message
                    })
                } else if(err.errors.email.message == 'Invalid email') {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                }
            } else if(err.errors.password) {
                if(err.errors.password.message == 'Password must contain at least one letter, at least one number, and be longer than six charaters.') {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                }
            } else {
                res.status(500).json(err)
            }
        })
    }

    static registerAdmin(req, res) {
        User.create({
            ...req.body,
            role: 'admin'
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            if(err.errors.fullName) {
                res.status(400).json({
                    message: err.errors.fullName.message
                })
            } else if(err.errors.email) {
                if(err.errors.email.message == 'Email has been used') {
                    res.status(409).json({
                        message: err.errors.email.message
                    })
                } else if(err.errors.email.message == 'Invalid email') {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                }
            } else if(err.errors.password) {
                if(err.errors.password.message == 'Password must contain at least one letter, at least one number, and be longer than six charaters.') {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                }
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user && bcrypt.compare(req.body.password, user.password)) {
                const payload = {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                res.status(200).json({
                    access_token,
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                })
            } else {
                res.status(400).json({
                    message: 'Wrong email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static googleLogin(req, res) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: clientID,
        })
        .then(ticket => {
            const { name, email, picture } = ticket.getPayload()
            return User
                .findOne({ email })
                .then(user => {
                    if(!user) {
                        let newUser = new User({
                            fullName: name,
                            email: email,
                            password: name.slice(0, 3) + email.slice(0, 3)
                        })
                        newUser
                            .save()
                            .then(user => {
                                const payload = {
                                    id: user._id,
                                    fullName: user.fullName,
                                    email: user.email
                                }
                                const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                                res.status(200).json({
                                    access_token,
                                    fullName: name,
                                    email,
                                    picture
                                })
                            })
                    } else {
                        const payload = {
                                    id: user._id,
                                    fullName: user.fullName,
                                    email: user.email
                                }
                        const access_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                        res.status(200).json({
                            access_token,
                            fullName: name,
                            email,
                            picture
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Internal server error'
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error'
            })
        })
    }
}

module.exports = UserController