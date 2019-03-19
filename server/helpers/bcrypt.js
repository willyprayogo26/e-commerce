const bcrypt = require('bcrypt')

module.exports = {
    hash: function(str) {
        return bcrypt.hashSync(str, bcrypt.genSaltSync(10))
    },
    compare: function(str, hashStr) {
        return bcrypt.compareSync(str, hashStr)
    }
}