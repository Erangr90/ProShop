// Node packages
import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
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

const Order = mongoose.model('Order', orderSchema)

export default Order