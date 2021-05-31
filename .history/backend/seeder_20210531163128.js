// Node packages
import mongoose from 'mongoose'
import  dotenv from 'dotenv'
import colors from 'colors'
// DB connection file
import connectDB from './config/db.js'
// Data
import users from './data/users.js'
import products from './data/products.js'
// Models
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
// Initialize environment variables
dotenv.config()
// Initialize DB connection
connectDB()

const importData = async () =>{
    try {

       await User.deleteMany()
       await Product.deleteMany()
       await Order.deleteMany()

       const createdUsers =  await User.insertMany(users)
       const someUser = createdUsers[0]._id

       const initProducts = products.map(product => {
           return {...product, user: someUser}
       })

       await Product.insertMany(initProducts)

       console.log('Data imported'.green.inverse)
       process.exit()

    } catch (error) {

        console.error(((error.message).red.inverse))
        process.exit(1)

    }
}

const destroyedData = async () =>{
    try {

       await User.deleteMany()
       await Product.deleteMany()
       await Order.deleteMany()


       console.log('Data destroyed'.red.inverse)
       process.exit()

    } catch (error) {

        console.error(((error.message).red.inverse))
        process.exit(1)

    }
}


