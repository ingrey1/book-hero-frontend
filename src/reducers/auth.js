import {AUTHORIZE, LOGOUT, UPDATE_LOGIN_ERRORS, SIGNUP, UPDATE_USER_INFO} from "../actions/types"


const initialState = {
    email: "",
    loggedIn: false,
    userId: null,
    firstName: "",
    lastName: "",
    username: "",
    errors: []
}

export default function auth(state=initialState, action) {
    switch (action.type) {

        case UPDATE_USER_INFO: {
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                username: action.payload.username
            }
        }

        case AUTHORIZE:
            
            return {
                ...state,
                email: action.payload.email,
                username: action.payload.username,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                loggedIn: true,
                userId: action.payload.id,
                errors: []

            }
        case UPDATE_LOGIN_ERRORS:

            return {
                ...state,
                errors: action.payload.errors
            }

        case LOGOUT:
            if (localStorage && localStorage.getItem('fire_token')) localStorage.removeItem('fire_token')
            return {
              ...state,
              email: null,
              errors: [],
              firstName: "",
              lastName: "",
              username: "",
              loggedIn: false,
              userId: null  
            } 

        default: return state
    }
}
