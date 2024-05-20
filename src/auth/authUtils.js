'use strict'

const JWT = require('jsonwebtoken')
const asyncHanlde = require('../helpers/asyncHandle')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'athorization',
    REFRESHTOKEN: 'x-rtoken-id'
} 

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        //accessToken 
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        //refresh token
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        //validion token
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.log(`Erorr verify:: `,err)
            } else{
                console.log(`Decode verify::`, decode)
            }
        })

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(`You have Error when create accessToken or refreshToken ======>>>`, error.message)
    }
}

const authenticationV2 = asyncHanlde(async (req, res, next) => {
    /*
    1. Check userId missing??
    2. Get accessToken
    3. Verify Token
    4. Check use in DB is correct?
    5. Check keytore with userId?
    6. Return next()
    */ 
   //1. 
   const userId = req.headers[HEADER.CLIENT_ID]
   if(!userId) throw new AuthFailureError('invalid Request!!!')


    //2..
    const keyStore = await findByUserId(userId)  
    if(!keyStore) throw new NotFoundError('Not Found!!!')

    //3...
    
    if(req.headers[HEADER.REFRESHTOKEN]){
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN]
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
            if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User')
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
            console.log(`refreshtoken in headder ================`,userId, req.headers[HEADER.REFRESHTOKEN], decodeUser)
            return next()
        } catch (error) {
            throw error
        }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request!!!!!')

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})


const authentication = asyncHanlde(async (req, res, next) => {
    /*
    1. Check userId missing??
    2. Get accessToken
    3. Verify Token
    4. Check use in DB is correct?
    5. Check keytore with userId?
    6. Return next()
    */ 
   //1. 
   const userId = req.headers[HEADER.CLIENT_ID]
   if(!userId) throw new AuthFailureError('invalid Request!!!')


    //2..
    const keyStore = await findByUserId(userId)  
    if(!keyStore) throw new NotFoundError('Not Found!!!')

    //3...
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request!!!!!')

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyToken = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyToken,
    authenticationV2
}