// Constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESSES,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESSES,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESSES,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESSES,
    USER_UPDATE_PROFILE_FAIL
} from '../constants/usersConstants'
// Node packages
import axios from 'axios'


// User login
export const login = (email,password)=> async(dispatch)=> {
    try {
        dispatch({type: USER_LOGIN_REQUEST })

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // (url,data,config)
        const {data}  = await axios.post('/api/users/login',{email,password},config)

        dispatch({
            type: USER_LOGIN_SUCCESSES,
            payload: data
        })

        // Set user info on localStorage
        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// User logout
export const logout = ()=> async(dispatch)=> {

    localStorage.removeItem('userInfo')
     dispatch({type: USER_LOGOUT})


}


// User register
export const register = (name,email,password)=> async(dispatch)=> {
    try {
        dispatch({type: USER_REGISTER_REQUEST })

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // (url,data,config)
        const {data}  = await axios.post('/api/users',{name,email,password},config)

        dispatch({
            type: USER_REGISTER_SUCCESSES,
            payload: data
        })

        // Login the user after register
        dispatch({
            type: USER_LOGIN_SUCCESSES,
            payload: data
        })

        // Set user info on localStorage
        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Get login user Profile
export const getUserProfile = (id)=> async(dispatch,getState)=> {
    try {
        dispatch({type: USER_DETAILS_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.get('/api/users/'+id,config)

        dispatch({
            type: USER_DETAILS_SUCCESSES,
            payload: data
        })



    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

// Update login user Profile
export const updateUserProfile = (user)=> async(dispatch,getState)=> {
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQUEST })

        const {userLogin:{userInfo}} = getState()

        // Make a json request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+userInfo.token
            }
        }
        // (url,data,config)
        const {data}  = await axios.put('/api/users/profile',user,config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESSES,
            payload: data
        })



    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}