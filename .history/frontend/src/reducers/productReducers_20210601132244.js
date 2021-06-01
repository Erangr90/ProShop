// Constants
import { PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESSES } from '../constants/productsConstants'

// List of all products
export const productListReducer = (state= {products:[]}, action)=>{

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}
        case PRODUCT_LIST_SUCCESSES:
            return {loading:false, products:action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}