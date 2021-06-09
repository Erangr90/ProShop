// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrderItems,
    getOrderById

} from '../controllers/ordersController.js'



// Routes



router.route('/').post(protect,addOrderItems)
router.route('/:id').get(protect,getOrderById)



export default router