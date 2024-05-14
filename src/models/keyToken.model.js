'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
let keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    privateKey:{
        type:String,
        require: true
    },
    refreshTokenUsed:{
        type:Array, // Những rf Token đã được sử dụng
        default:[],
    },  refreshToken:{
        type:String, // RF Token đang được sử dụng
        require:true,
    },

  
},{
    collation: COLLECTION_NAME,
    timestamps: true
}
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);

// module.exports =