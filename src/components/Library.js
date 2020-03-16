import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import LibraryBooks from './LibraryBooks'
import LibraryControls from './LibraryControls'
import {retrieveLibrary} from '../actions/library'


function Library({getLibrary, library, userId, history, loggedIn, ...props}) {
    
    useEffect(() => {
        if (!loggedIn) {
            history.push("/welcome")
        }
    })

    useEffect(() => { // populate library if its empty
       if (library.userBooks.length === 0) retrieveLibrary(userId) 
    }, [])

    return <div>
       <LibraryControls /> 
       <LibraryBooks />
    </div>
}

const mapStateToProps = (state) => {
  return {
      library: state.library,
      userId: state.auth.userId,
      loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLibrary: (userId) => dispatch(retrieveLibrary(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)