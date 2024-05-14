'use strict'

const { filter } = require("lodash")
const keyTokenModel = require("../models/keyToken.model")
const Types = require('mongoose');

class KeyTokenService{
    static createKeyToken= async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // level 0
            // const token = await keyTokenModel.create({
            //     user: userId, 
            //     publicKey,
            //     privateKey
            // })

            // level ++
            //Return tokens ? tokens.publicKey : null 

            const filter = {user: userId}, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            } , options= {upsert: true, new: true}
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
            // return token ? token.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user:  Types.ObjectId(userId) }).lean();
    }
    static removeKeyById = async(id) => {
        return await keyTokenModel.remove(id)
    }
}

module.exports = KeyTokenService