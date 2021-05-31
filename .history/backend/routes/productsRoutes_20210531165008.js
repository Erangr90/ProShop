// Node packages
import  express from 'express'
// Models
import Product from '../models/productModel.js'

const router = express.Router()

router.get('/',(req,res)=>{
    const products = Product.find()
    res.json(products)
})
router.get('/:id',(req,res)=>{
    const product = Product.findById(req.params.id)
    res.json(product)
})



export default router