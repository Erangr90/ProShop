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
    USER_DETAILS_FAIL
} from '../constants/usersConstants'



// User login
export const userLoginReducer = (state= {}, action)=>{

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESSES:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}

// User register
export const userRegisterReducer = (state= {}, action)=>{

    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESSES:
            return {loading:false, userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

// Get user profile
export const userProfileReducer = (state= {user:{}}, action)=>{

    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading:true}
        case USER_DETAILS_SUCCESSES:
            return {loading:false, user:action.payload}
        case USER_DETAILS_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}