// Node packages
import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default:false
    },
},{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product