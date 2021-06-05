// Node packages
import  jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
// Models
import User from '../models/userModel.js'



const protect =  asyncHandler( async(req,res,next)=>{

    let token
// If there is a token in the headers
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){

    try {
    // Get the token form the headers
      token = req.headers.authorization.split(' ')[1]
        // Verify the token by the secret
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // Initialize the user as login
        req.user = await User.findById(decoded.id).select('-password')

        next()
    // Incorrect token
    } catch (error) {

        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')

    }

}
// There is no token
if(!token){
    res.status(401)
    throw new Error('Not authorized, no token')
}

})





export {
    protect
}