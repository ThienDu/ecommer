'use strict'

const apiKeyModelSchema = require("../models/apikey.model")

const crypto = require('crypto')

const finById = async(key) => {
    const objKey = await apiKeyModelSchema.findOne({key, status: true}).lean()
   
    return objKey
}

module.exports = {
    finById
}