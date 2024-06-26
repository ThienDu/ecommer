'use strict'
const express= require('express')
const accessController = require('../../controller/access.controller')
const asyncHanlde = require('../../helpers/asyncHandle')
const { authentication, authenticationV2 } = require('../../auth/authUtils')
const router = express.Router()

//signUP
router.post('/shop/signup', asyncHanlde( accessController.signUp))


router.post('/shop/login', asyncHanlde(accessController.login))


//Authentication
router.use(authenticationV2)
///////////////////////////

router.post('/shop/logout', asyncHanlde(accessController.logout))
router.post('/shop/handleRefreshToken', asyncHanlde(accessController.handleRefreshToken))
module.exports = router