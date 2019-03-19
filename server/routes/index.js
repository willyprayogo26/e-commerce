const router = require('express').Router()
const controller_product = require('../controllers/product')
const controller_user = require('../controllers/user')
const image = require('../helpers/images')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router
    .post('/user/register', controller_user.register)
    .post('/user/registerAdmin', controller_user.registerAdmin)
    .post('/user/login', controller_user.login)
    .get('/items', controller_product.findAll)
    .post('/items', authentication, controller_product.create)
    .put('/items/:id', authentication, controller_product.update)
    .delete('/items/:id', authentication, controller_product.delete)

module.exports = router