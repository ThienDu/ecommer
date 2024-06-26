'use strict'

//!dmbg
const {Schema, model, Types, Collection} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'


const productSchema = new Schema({
    product_name: {type: String, require: true},
    product_thumb: {type: String, require: true},
    product_description :String,
    product_price: {type: Number, require: true},
    product_quantity: {type: Number, require: true},
    product_type: {type: String, require: true, enum: ['Electronics', 'Clothing']},
    product_shop: {type: Schema.Types.ObjectId, ref: 'Shop'},
    product_attributes: {type:Schema.Types.Mixed, require: true}

},
{
    collection: COLLECTION_NAME,
    timestamps: true
})


//define the product type = clothing

const clothingSchema= new Schema({
    brand: {type: String, require: true},
    size: String,
    material: String,
    product_shop : {type: Schema.Types.ObjectId, ref : 'Shop'}
}, {
    collection: 'clothes',
    timestamps: true
})


//define electronic type
const electronicSchema= new Schema({
    manufatory: {type: String, require: true},
    model: String,
    color: String,
    product_shop : {type: Schema.Types.ObjectId, ref : 'Shop'}

}, {
    collection: 'electronic',
    timestamps: true
})



module.exports = {
    product : model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronics', electronicSchema)
}