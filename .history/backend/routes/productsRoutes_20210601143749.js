// Node packages
import  express from 'express'
import asyncHandler from 'express-async-handler'
// Models
import Product from '../models/productModel.js'
// Initialize express Router
const router = express.Router()
// Routes

// @dec:    Get all products
// @route:  GET /api/products
// @access: Public
router.get('/',asyncHandler(async(req,res)=>{
    const products =  await Product.find({})
    res.status(401)
        throw new Error('Not authorize')
    res.json(products)
}))
// @dec:    Get single product
// @route:  GET /api/products/:id
// @access: Public
router.get('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
}))



export default router