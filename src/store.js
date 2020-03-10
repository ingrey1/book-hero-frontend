import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "./reducers/root"
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(rootReducer, applyMiddleware(composeWithDevTools(thunk))

export default(store)
