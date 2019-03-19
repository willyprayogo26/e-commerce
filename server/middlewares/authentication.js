const jwt = require('../helpers/jwt')

module.exports = function (req, res, next) {
    if(req.headers.hasOwnProperty('access_token')) {
        try {
            const decoded = jwt.verify(req.headers.access_token)
            req.authUser = { ...decoded }
            next()
        } catch(err) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
    } else {
        res.status(401).json({
            message: 'Unauthenticated'
        })
    }
}