'use strict'

const { filter } = require("lodash")
const keyTokenModel = require("../models/keyToken.model")
const mongoose = require('mongoose');
const { BadRequestError } = require("../core/error.response");

const ObjectId = mongoose.Types
class KeyTokenService{
    static createKeyToken= async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // level 0
            // const token = await keyTokenModel.create({ change in main
            //     user: userId, 
            //     publicKey,
            //     privateKey
            // })

            // level ++
            //Return tokens ? tokens.publicKey : null     đây là brach test-rebase

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
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log(`asjdfjasd;lfja;sldkjf;laskjdf;lkajsd`, userId)
            throw new BadRequestError('Invalid user ID');
            
        }
        return await keyTokenModel.findOne({ user:userId }).lean();
    }
    static removeKeyById = async({id}) => {
        return await keyTokenModel.findOneAndDelete(id)
    }

    static findByRefeshTokenUsed = async (refreshToken)=> {
        return await keyTokenModel.findOne({refreshTokenUsed: refreshToken})
    }

    static deleteKeyById = async( userId) => {
        return await keyTokenModel.deleteOne({user:  userId})
    } 

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({refreshToken})
    }
}

module.exports = KeyTokenService