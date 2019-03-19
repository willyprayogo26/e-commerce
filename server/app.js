require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb://localhost/e-commerce', {
    useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/', routes)

// app.listen(port, () => {
//     console.log(`Listening on port: ${port}`)
// })

module.exports = app

