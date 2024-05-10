'use strict'

const JWT = require('jsonwebtoken')

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

module.exports = {
    createTokenPair
}