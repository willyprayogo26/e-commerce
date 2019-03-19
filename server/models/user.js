const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt= require('../helpers/bcrypt')

let userSchema = new Schema ({
    fullName: {
        type: String,
        required: [true, 'Invalid fullName']
    },
    email: {
        type: String,
        unique: true,
        validate: [
            {
                validator: function(value) {
                    return /^[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(value)
                },
                message:'Invalid email'
            },
            {
                validator: function(value) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: value
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false
                        }
                    })
                    .catch(err => {
                        return err.message
                    })
                },
                message:'Email has been used'
            }
        ]
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(v)
            },
            message: `Password must contain at least one letter, at least one number, and be longer than six charaters.`
        }
    },
    role: {
        type: String
    },
    listProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

userSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hash(this.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User