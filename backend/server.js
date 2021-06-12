// Node packages
import  express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import morgan from 'morgan'
// Middlewares
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// DB connection file
import connectDB from './config/db.js'
// API Routes
import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import ordersRoutes from './routes/orderRoutes.js'
import uploadsRoutes from './routes/uploadsRoutes.js'
// Initialize express server
const app = express()
// Use Json on req body
app.use(express.json())
// Static folders
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads') ))
// Initialize environment variables
dotenv.config()
// Initialize DB connection
connectDB()
// Follow the routes hits
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// Routes
app.use('/api/products',productsRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/orders',ordersRoutes)
app.use('/api/uploads',uploadsRoutes)

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