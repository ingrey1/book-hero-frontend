import {SET_CATEGORY, SET_TEXT_SIZE} from './types'


export function setCategory(newCategory) {
    return {
        type: SET_CATEGORY,
        payload: newCategory
    }
}