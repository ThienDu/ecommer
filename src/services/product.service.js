'use strict'


//define Factory class to create product
class ProductFactory {
    static async createdProduct(){

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
//define base Product class
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

    //Create Product
}