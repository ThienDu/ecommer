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

// handle erorr =>>  Phải đặt sau router
app.use((error, req, res, netxt) => {
    const statusCode = error.status || 500
    netxt(error)

    return res.status(statusCode).json({
        status: 'error',
        stack: error,
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})


module.exports = app