import {AUTHORIZE, LOGOUT, UPDATE_LOGIN_ERRORS, SIGNUP} from "../actions/types"


const initialState = {
    email: "",
    loggedIn: false,
    errors: []
}

export default function auth(state=initialState, action) {
    switch (action.type) {

        case AUTHORIZE:
            
            return {
                ...state,
                email: action.payload.email,
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

            return {
              ...state,
              email: null,
              errors: [],
              loggedIn: false,
              userId: null  
            } 

        default: return state
    }
}
