// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
// Actions
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/usersController.js'



// Routes

router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

router.route('/').post(registerUser).get(protect,isAdmin,getUsers)

router.route('/:id').delete(protect,isAdmin,deleteUser).get(protect,isAdmin,getUserById).put(protect,isAdmin,updateUser)



export default router