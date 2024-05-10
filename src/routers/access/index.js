'use strict'
const express= require('express')
const accessController = require('../../controller/access.controller')
const { asyncHanlde } = require('../../core/error.response')
const router = express.Router()

//signUP
router.post('/shop/signup', asyncHanlde( accessController.signUp))

module.exports = router