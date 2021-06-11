// Constants
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESSES, PRODUCT_FAIL, PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESSES,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESSES
} from '../constants/productsConstants'
// Node packages
import axios from 'axios'




// Get list of all products
export const ProductsList = ()=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST })

        const {data}  = await axios.get('/api/products')

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