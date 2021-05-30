// Node packages
const express = require('express');
// initialize express server
const app = express()
// Data
const products = require('./data/products');
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
app.listen(5000, console.log('Server is running on port 5000') )