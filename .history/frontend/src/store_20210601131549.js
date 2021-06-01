// Redux packages
import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// Reducers
import { productListReducer } from './reducers/productReducers'



// Reducer for create store (which contain all the reducers)
const reducer = combineReducers({
    productsList:productListReducer,
})
// The first state of the web page
const initialState = {}

// Middlewares array for apply include thunk(to make asynchronous request)
const middlewares =[thunk]

// Crete a store and fix redux issue by : 'composeWithDevTools(applyMiddleware(thunk))'
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlewares)))

export default store