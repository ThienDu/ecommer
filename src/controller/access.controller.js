'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController{
    handleRefreshToken = async (req, res, next) => {
            new SuccessResponse({
                message: 'Get Token success!!',
                metadata: await AccessService.refreshToken(req.body.refreshToken)
            }).send(res)
    }
    
    logout = async(req, res, next)=> {
        new SuccessResponse({
            message: 'Logout success!!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    login = async(req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) =>{
        console.log(`[P]::signUp`, req.body)
        //200 => OK, 201 => CREATED
        // return res.status(201).json(await AccessService.signUp(req.body))

        new CREATED({
            message: 'Regiserted OK!!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send(res) 
    }
}

module.exports = new AccessController()