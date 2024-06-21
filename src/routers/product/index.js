'use strict'
const express= require('express')
const productController = require('../../controller/product.controller')
const asyncHanlde = require('../../helpers/asyncHandle')
const { authentication, authenticationV2 } = require('../../auth/authUtils')
const router = express.Router()

//signUP




//Authentication
router.use(authenticationV2)
///////////////////////////
router.post('', asyncHanlde( productController.createProduct))

module.exports = router