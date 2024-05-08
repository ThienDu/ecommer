require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {default:helmet} = require('helmet')
const compression = require('compression')
const  app= express()



// init middlawares
app.use(morgan("dev")) 
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// connect DB
require('./dbs/init.mongodb')
// const {countConnect} = require('./helpers/check.connect')
// countConnect()



// init route
app.use('', require('./routers'))

// handle erorr

module.exports = app