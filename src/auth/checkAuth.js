'use strict'

const { finById } = require("../services/apiKey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'athorization'
} 

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key) {
            return res.status(403).json({
                message: 'Fobidden Erorr'
            })
        }
        //check objKey
        const objKey = await finById(key)
        console.log(`Fobidden Error key-api =========>>>>>>>>>>>>`, key)
        if(!objKey){
            return res.status(403).json({
                message: 'Fobidden Error key-api'
            })
        }

        req.objKey = objKey
        return next()

    } catch (error) {
        console.log(`Erorr apiKey ==>>>> `, error.message)
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permissions deniel'
            })
        }
        console.log('permissions::', req.objKey.permissions)
        const validPermissions = req.objKey.permissions.includes(permission)
        if(!validPermissions) {
            return res.status(403).json({
                message: 'Permissions deniel'
            })
        }
        return next()
    }
    
}


module.exports = {
    apiKey,
    permission
}