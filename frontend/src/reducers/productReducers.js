// Constants
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESSES, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESSES, PRODUCT_FAIL, PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESSES,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESSES
} from '../constants/productsConstants'

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


// Get single product
export const getProductReducer = (state= {product:{}}, action)=>{

    switch (action.type) {
        case PRODUCT_REQUEST:
            return {loading:true}
        case PRODUCT_SUCCESSES:
            return {loading:false, product:action.payload}
        case PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Delete a product
export const productDeleteReducer = (state= {}, action)=>{

    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading:true}
        case PRODUCT_DELETE_SUCCESSES:
            return {loading:false, success:true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Create a product
export const productCreateReducer = (state= {}, action)=>{

    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESSES:
            return {loading:false, success:true, product:action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }

}