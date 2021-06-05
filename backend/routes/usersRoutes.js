// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    authUser,
    getUserProfile
} from '../controllers/usersController.js'



// Routes

router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile)



export default router