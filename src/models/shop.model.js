'use strict'

//!dmbg
const {Schema, model, Types, Collection} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
let shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxLength:150
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
        trim:true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default:'inactive'
    },
    verfify:{
        type: Schema.Types.Boolean,
        default: false
    },
    roles:{
        type:Array,
        default:[],
    },
},{
    timestamps:true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);