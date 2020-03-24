import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import LibraryBooks from './LibraryBooks'
import LibraryControls from './LibraryControls'
import {retrieveLibrary} from '../actions/library'
import {clearCurrentChapter} from '../actions/currentChapter'


function Library({getLibrary, clearCurrentChapter, library, userId, loggedIn, ...props}) {
    
   

    useEffect(() => { // populate library if its empty
        clearCurrentChapter() 
        console.log("useeffect library, once")
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
      userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLibrary: (userId) => dispatch(retrieveLibrary(userId)),
        clearCurrentChapter: () => dispatch(clearCurrentChapter())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)