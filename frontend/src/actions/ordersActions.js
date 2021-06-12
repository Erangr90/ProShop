// Constants
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL
} from '../constants/ordersConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
// Node packages
import axios from 'axios'
// Actions
import {logout} from '../actions/usersActions'

// Create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.post('/api/orders', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

// Get order by id
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.get('/api/orders/'+id, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

// Pay order
export const payOrder = (orderId,paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.put('/api/orders/'+orderId +'/pay',paymentResult,config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

// Get user login orders
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MY_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.get('/api/orders/myorders', config)

    dispatch({
      type: ORDER_MY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: message,
    })
  }
}

// Get all orders
export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.get('/api/orders', config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

// Delivered order
export const deliveredOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    // Make a json request & get the token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+userInfo.token,
      },
    }

    const { data } = await axios.put('/api/orders/'+order._id +'/delivered',{},config)

    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    })
  }
}