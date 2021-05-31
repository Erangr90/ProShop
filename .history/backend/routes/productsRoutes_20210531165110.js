// Node packages
import  express from 'express'
// Models
import Product from '../models/productModel.js'
// Initialize express Router
const router = express.Router()
// Routes
router.get('/',(req,res)=>{
    const products = Product.find()
    res.json(products)
})
router.get('/:id',(req,res)=>{
    const product = Product.findById(req.params.id)
    res.json(product)
})



export default router