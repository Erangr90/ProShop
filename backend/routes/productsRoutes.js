// Node packages
import  express from 'express'
// Initialize express Router
const router = express.Router()
import { getProducts, getProductById} from '../controllers/productsController.js'



// Routes
router.route('/:id').get(getProductById)

router.route('/').get(getProducts)



export default router