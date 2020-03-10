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
                loggedIn: true

            }
        case UPDATE_LOGIN_ERRORS:

            return {
                ...state,
                errors: action.payload.errors
            }

        default: return state
    }
}
