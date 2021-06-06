// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect } from '../middleware/authMiddleware.js'
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
} from '../controllers/usersController.js'



// Routes

router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile)

router.route('/').post(registerUser).put(protect,updateUserProfile)



export default router