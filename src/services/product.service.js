'use strict'

const { clothing, electronic, product } = require("../models/product.model")

const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response")
//define Factory class to create product
class ProductFactory {
    /*
    type :'Clothing',
    payload
    */
    static async createProduct(type, payload){
        switch(type){
            case 'Electronics':
                return new Electronics(payload).createProduct()
            case 'Clothing':
                return new Clothing(payload).createProduct()
            default:
                throw new BadRequestError(`Invalid Product Type ${type}`) 
        }
    }
}

/*
  product_name: {type: String, require: true},
    product_thumb: {type: String, require: true},
    product_description :String,
    product_price: {type: Number, require: true},
    product_quantity: {type: Number, require: true},
    product_type: {type: String, require: true, enum: ['Electronic', 'Clothing', 'Furniture']},
    product_shop: {type: Schema.Types.ObjectId, ref: 'Shop'},
    product_attributes: {type:Schema.Types.Mixed, require: true}
 */
//define base product class
class Product{
    constructor({
        product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes
    }){
        this.product_name = product_name
        this.product_thumb = product_thumb 
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    //Create new product 
    async createProduct(product_id){
        return await product.create({...this,_id: product_id})
    }
}


//Define sub-class for diffient product types Clothings
class Clothing extends Product{
    async createProduct(){
        const newClothings = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if(!newClothings) throw new BadRequestError('Create new clothing error')
        
        const newProduct = await super.createProduct(newClothings._id)
        if(!newProduct) throw new BadRequestError('Create new Product clothing error')
        return newProduct
    }
}

//Define sub-class for diffient product types electronic 
class Electronics extends Product{
    async createProduct(){
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if(!newElectronic) throw new BadRequestError('Create new electronic error')
        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new BadRequestError('Create new product electronic error')
        return newProduct
    }
}

module.exports = ProductFactory;