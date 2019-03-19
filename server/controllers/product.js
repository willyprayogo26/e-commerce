const Product = require('../models/product')

class ProductController {
    static findAll(req, res) {
        Product
            .find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static create(req, res) {
        let input = {
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price,
            // picture: req.file.cloudStoragePublicUrl,
            user: req.authUser.id
        }
        Product
            .create(input)
            .then(product => {
                console.log('masuk')
                res.status(201).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }

    static update(req, res) {
        let input = {
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price
        }
        Product
            .findByIdAndUpdate({ _id: req.params.id }, input, { new: true })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }

    static delete(req, res) {
        Product
            .findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'Product has been deleted'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }
}

module.exports = ProductController