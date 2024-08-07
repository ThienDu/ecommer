'use strict'

const {product, electronic, clothing, furniture} = require('../../models/product.model')
const Types = require('mongoose')

const findAllDraftsForShop = async ({query, limit, skip}) => {
    return await product.find(query)
                        .populate('product_shop', 'name email -_id')
                        .sort({updateAt: -1})
                        .skip(skip)
                        .limit(limit)
                        .exec()
} 

const findAllPublishForShop = async ({query, limit, skip}) => {
    return await product.find(query)
                        .populate('product_shop', 'name email -_id')
                        .sort({updateAt: -1})
                        .skip(skip)
                        .limit(limit)
                        .exec()
} 


const publishProductByShop = async({product_shop, product_id})=> {
    const foundShop = await product.findOne({
        product_shop : new  Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    if(!foundShop) return null
    foundShop.isDraft = false;
    foundShop.isPublished = true;
    const {modifiedCount} = await foundShop.update(foundShop)
     
    return modifiedCount
}

module.exports ={
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop
}