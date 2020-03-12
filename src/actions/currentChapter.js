import {START_READER, END_READER, GET_CHAPTER} from './types'

function startReader() {
    return {
       type: START_READER
    }
}

function endReader() {
    return {
       type: END_READER
    }
}