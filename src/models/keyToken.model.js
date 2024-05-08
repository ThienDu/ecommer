'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
let keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshToke:{
        type:Array,
        default:[],
    },
  
},{
    collation: COLLECTION_NAME,
    timestamps: true
}
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);

// module.exports =