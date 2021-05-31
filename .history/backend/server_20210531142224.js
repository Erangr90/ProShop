// Node packages
import  express from 'express'
import  dotenv from 'dotenv'
// DB connection file
import connectDB from './config/db.js'
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
app.get('/api/products',(req,res)=>{
    res.json(products)
})
app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p=> p._id === req.params.id)
    res.json(product)
})
// Open port to listen
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server is running in ' + process.env.NODE_ENV + ' mode on port '+ PORT))