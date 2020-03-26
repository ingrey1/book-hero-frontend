


const initialState = []

export default function comments(state=initialState, action) {
    switch (action.type) {

        case ADD_COMMENT:

          return [
              ...state,
              action.payload
          ]

        case SET_COMMENTS:

           return action.payload 

        default: return state
    }
}
