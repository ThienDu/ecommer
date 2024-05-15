'use strict'

const apiKeyModelSchema = require("../models/apikey.model")

const crypto = require('crypto')

const finById = async(key) => {
    // const  newKey = await apiKeyModelSchema.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
    // console.log(`new key hereeeeeeeeeeee `, newKey)
    const objKey = await apiKeyModelSchema.findOne({key, status: true}).lean()
   
    return objKey
}

module.exports = {
    finById
}