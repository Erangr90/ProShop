// Constants
import { PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESSES
} from '../constants/productsConstants'
// Node packages
import axios from 'axios'
// Get list of all products
export const ProductsList = (id)=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST })

        const {data}  = await axios.get('/api/products/'+id)

        dispatch({
            type: PRODUCT_LIST_SUCCESSES,
            payload: data
        })


    } catch (error) {

    }

}