'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")
const ProductServiceV2 = require("../services/product.service_v2")

class ProductController{

    createProduct = async (req, res, next) => {
        console.log( "===============================", req.user)
        new SuccessResponse({
            message: 'Create product success!!',
            metadata: await ProductServiceV2.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    //PUT

    //END PUT


    //QUERY //
    /**
     * @desc Get all draft for shop
     * @param {Number} limit 
     * @param {Number} skip 
     * @return {Json}
     */
    getAllDraftForShop = async(req, res, next) => {
        new SuccessResponse({
            message: 'Get list draft for shop success!!',
            metadata: await ProductServiceV2.findAllDraftsForShop( {
                product_shop: req.user.userId
            })
        }).send(res)
    }
    //END QUERY//
}

module.exports = new ProductController()