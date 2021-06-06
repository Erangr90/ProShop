// Constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESSES,
    USER_LOGIN_FAIL,
    USER_LOGOUT
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