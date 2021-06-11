// Node packages
import asyncHandler from 'express-async-handler'
// Models
import Product from '../models/productModel.js'


// @dec:    Get all products
// @route:  GET /api/products
// @access: Public
const getProducts = asyncHandler( async(req,res) => {

    const products =  await Product.find({})
    res.json(products)

})

// @dec:    Get product by id
// @route:  GET /api/products/:id
// @access: Public
const getProductById = asyncHandler( async(req,res) => {

    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// @dec:    Delete a product
// @route:  DELETE /api/products/:id
// @access: Private/Admin
const deleteProduct = asyncHandler( async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product){

        // if(product.user._id === req.user._id){

        // }
        try {

            await Product.findByIdAndDelete(product._id)
            res.json({message:'Product deleted successfully'})

        } catch (error) {
            throw error

        }

    }else{

        res.status(404)
        throw new Error('Product not found')

    }


})

// @dec:    Update product by admin
// @route:  PUT /api/products/:id
// @access: Private/admin
const updateProduct = asyncHandler( async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product){





        const updatedProduct = await product.save()

        res.json(updatedProduct)

    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }


})

export {getProducts, getProductById,deleteProduct,updateProduct }