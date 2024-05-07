const express = require('express')
const morgan = require('morgan')
const {default:helmet} = require('helmet')
const compression = require('compression')
const  app= express()



// init middlawares
app.use(morgan("dev")) 
app.use(helmet())
app.use(compression())


// connect DB

// init route

// handle erorr

module.exports = app