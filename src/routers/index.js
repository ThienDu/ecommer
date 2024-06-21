'use strict'
const express= require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()


//check apikey
router.use(apiKey)
//checl permission
router.use(permission('0000'))
//check permission
router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))
// router.get('' , (req, res, next) =>{
//     return res.status(200).json({
//         message: 'hello js'
//     })
// })

module.exports = router