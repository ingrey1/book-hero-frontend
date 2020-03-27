import {SET_BOOKS} from '../actions/types'


const initialState = []

export default function books(state=initialState, action) {
    switch (action.type) {

        case SET_BOOKS:
            return action.payload

        default: return state
    }
}
