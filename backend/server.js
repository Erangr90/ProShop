// Node packages
import  express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
// Middlewares
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// DB connection file
import connectDB from './config/db.js'
// API Routes
import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import ordersRoutes from './routes/orderRoutes.js'
// Initialize express server
const app = express()
// Use Json on req body
app.use(express.json())
// Initialize environment variables
dotenv.config()
// Data
import  products from './data/products.js'
// Initialize DB connection
connectDB()
// Routes
app.use('/api/products',productsRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/orders',ordersRoutes)


app.get('/',(req,res)=>{
    res.send('API is running')
})
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})


// Middlewares
app.use(notFound)
app.use(errorHandler)
// Open port to listen
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(('Server is running in ' + process.env.NODE_ENV + ' mode on port '+ PORT).yellow.bold))