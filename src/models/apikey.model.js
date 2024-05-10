'use strict'

const {Schema, model, Types} = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = 'ApiKeys'
const COLLECTION_NAME = 'ApiKey'
// Declare the Schema of the Mongo model
let apiKeyModelSchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    permissions:{
        type:[String],
        required:true,
        enum:['0000', '1111', '2222'],
    },
   
},{
    timeseries: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeyModelSchema);