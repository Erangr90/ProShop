// Node packages
import  express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
// DB connection file
import connectDB from './config/db.js'
// API Routes
import productsRoutes from './routes/productsRoutes.js'
// Initialize express server
const app = express()
// Initialize environment variables
dotenv.config()
// Data
import  products from './data/products.js'
// Initialize DB connection
connectDB()
// Routs
app.get('/',(req,res)=>{
    res.send('API is running')
})
app.use('/api/products',productsRoutes)
// Open port to listen
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(('Server is running in ' + process.env.NODE_ENV + ' mode on port '+ PORT).yellow.bold))