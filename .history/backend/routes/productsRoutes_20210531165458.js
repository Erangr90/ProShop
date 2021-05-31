// Node packages
import  express from 'express'
import asyncHandler from 'express-async-handler'
// Models
import Product from '../models/productModel.js'
// Initialize express Router
const router = express.Router()
// Routes
router.get('/',asyncHandler(async(req,res)=>{
    const products =  await Product.find({})
    res.json(products)
}))

router.get('/:id',asyncHandler(async(req,res)=>{
    const product = Product.findById(req.params.id)
    res.json(product)
}))



export default router