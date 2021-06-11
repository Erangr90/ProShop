// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect, isAdmin } from '../middleware/authMiddleware.js'

import { getProducts,
        getProductById,
        deleteProduct,
        updateProduct,
        createProduct} from '../controllers/productsController.js'



// Routes


router.route('/').get(getProducts).post(protect,isAdmin,createProduct)

router.route('/:id').get(getProductById).delete(protect,isAdmin,deleteProduct).put(protect,isAdmin,updateProduct)



export default router