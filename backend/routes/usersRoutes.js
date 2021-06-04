// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
import {
    authUser
} from '../controllers/usersController.js'



// Routes

router.post('/login',authUser)



export default router