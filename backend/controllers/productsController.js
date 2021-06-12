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

// @dec:    Create a product
// @route:  POST /api/products
// @access: Private/Admin
const createProduct = asyncHandler( async(req,res) => {

    const product = new Product( {
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image: '/images/sample.jpg',
        brand:'Sample Brand',
        category: 'Sample Category',
        countInStock:0,
        numReviews:0,
        description:'Sample Description'
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)


})

// @dec:    Update product by admin
// @route:  PUT /api/products/:id
// @access: Private/admin
const updateProduct = asyncHandler( async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product){

        const { name, price, image, brand, category, countInStock , description } = req.body

        product.name = name || product.name
        product.price = price || product.price
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
        product.description = description || product.description

        const updatedProduct = await product.save()

        res.json(updatedProduct)

    }else{
        res.status(404)
        throw new Error('Product not found')
    }


})

// @dec:    Create review a product
// @route:  POST /api/products/:id/reviews
// @access: Private
const createReview = asyncHandler( async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product){

        const { rating,comment } = req.body

        const alreadyRate = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

        if(alreadyRate){
            res.status(400)
            throw new Error('Product already reviewed')
        }else{
            const review = {
                name:req.user.name,
                rating:Number(rating),
                comment: comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0) / product.reviews.length

            const updatedProduct = await product.save()
            res.status(201).json(updatedProduct)


        }

    }else{
        res.status(404)
        throw new Error('Product not found')
    }


})

export {getProducts, getProductById,deleteProduct,updateProduct, createProduct,createReview }