// Constants
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESSES, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESSES, PRODUCT_FAIL, PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESSES,
    PRODUCT_REQUEST,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESSES,
    PRODUCT_SUCCESSES,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESSES
} from '../constants/productsConstants'
// Node packages
import axios from 'axios'




// Get list of all products
export const ProductsList = (keyword='',pageNumber='')=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST })

        const {data}  = await axios.get('/api/products?keyword='+keyword+'&pageNumber='+pageNumber)

        dispatch({
            type: PRODUCT_LIST_SUCCESSES,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


// Get single product
export const getProduct = (id)=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_REQUEST })

        const {data}  = await axios.get('/api/products/'+id)

        dispatch({
            type: PRODUCT_SUCCESSES,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


// Delete a product
export const deleteProduct = (id)=> async(dispatch,getState)=> {

    try {
        dispatch({type: PRODUCT_DELETE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request & get the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        await axios.delete('/api/products/'+id,config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESSES,
        })



    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }


}

// Create product
export const createProduct = ()=> async(dispatch,getState)=> {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
       const {data} = await axios.post('/api/products',{},config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESSES,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Update product
export const updateProduct = (product)=> async(dispatch,getState)=> {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
       await axios.put('/api/products/'+product._id,product,config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESSES,
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Create review
export const reviewProduct = (productId,review)=> async(dispatch,getState)=> {
    try {
        dispatch({type: PRODUCT_REVIEW_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
       await axios.post('/api/products/'+productId+'/reviews',review,config)

        dispatch({
            type: PRODUCT_REVIEW_SUCCESSES,
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}