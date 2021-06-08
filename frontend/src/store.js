// Redux packages
import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// Reducers
import { productListReducer,getProductReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userProfileReducer, updateProfileReducer} from './reducers/usersReducers'



// Reducer for create store (which contain all the reducers)
const reducer = combineReducers({
    productsList: productListReducer,
    productDetails: getProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    updateProfile: updateProfileReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}



// The first state of the web page
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage }
}

// Middlewares array for apply include thunk(to make asynchronous request)
const middlewares =[thunk]

// Crete a store and fix redux issue by : 'composeWithDevTools(applyMiddleware(thunk))'
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlewares)))

export default store