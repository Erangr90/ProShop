// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid

} from '../controllers/ordersController.js'



// Routes



router.route('/').post(protect,addOrderItems)


router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)



export default router