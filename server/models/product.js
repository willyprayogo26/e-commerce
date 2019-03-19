const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: String,
    amount: Number,
    price: Number,
    picture: {
        type: String
    },
    user: {
        type: String,
        ref: 'User'
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product