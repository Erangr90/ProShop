// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders

} from '../controllers/ordersController.js'



// Routes



router.route('/').post(protect,addOrderItems)

router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)



export default router