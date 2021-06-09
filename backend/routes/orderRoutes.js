// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    addOrderItems

} from '../controllers/ordersController.js'



// Routes

router.route('/').post(protect,addOrderItems)



export default router