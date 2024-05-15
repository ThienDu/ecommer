'use strict'

const shopModel = require("../models/shop.model")
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const {getInforData} = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../core/error.response")
const { throws } = require("assert")
const { finByEmail } = require("./shop.service")

const RolesShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITER',
    EDITER: 'EDITOR',
    ADMID: 'ADMIN'
}

class AccessService {

    static logout = async (keyStore) => {
        const rmKey = await KeyTokenService.removeKeyById(keyStore._id)
        return rmKey
    }

        //  1 - check email
        //  2 - match password
        //  3 - create accessToken and refreshToken
        //  4 - generate tokens
        //  5 - get data return login
    static login = async ({email, password, refreshToken = null}) => {
        
        //1..
        const foundShop = await finByEmail({email})
        if(!foundShop) throw new BadRequestError('Shop no Registered!!')
        
        //2..
        const match = bycrypt.compare(password, foundShop.password)
        if(!match) {
            throw new AuthFailureError('Authentication Error')
        }

        //3.. created private key, public key
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        //4 ..
        const {_id: userId} = foundShop
        const tokens = await createTokenPair({userId, email}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey: privateKey, 
            publicKey: publicKey, 
            userId: userId

        })
        return {
            metadata: {
                shop: getInforData({fileds: ['_id', 'name', 'email'], object: foundShop}),
                tokens
            }
        }
    }


    static signUp = async ({name, email, password}) =>{
        try {
            const holderShop = await shopModel.findOne({email}).lean() // sử dung lean() để trả về 1 object json thuần túy
            if(holderShop) {
                throw new BadRequestError('Error: Shop already registered')
            }
            
            const passwordHash = await bycrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RolesShop.SHOP]
            })
            console.log(`newShop here`, newShop)
            if(newShop) {
                //created private key, public key
                // const {privateKey, publicKey} =  crypto.generateKeyPairSync('rsa',{
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // })
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id ,
                    publicKey,
                    privateKey,
                })
                
                if(!keyStore){
                    return {
                        code: 'xxxx',
                        message: 'keyStore erorr!!!'
                    }
                }
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
                console.log(`Create token success`, tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: getInforData({fileds: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }
            }
            return{
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'erorr'
            }
        }
    }
}

module.exports = AccessService