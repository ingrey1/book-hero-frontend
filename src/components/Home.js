import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {retrieveLibrary} from '../actions/library'
import {clearCurrentChapter} from '../actions/currentChapter'

function Home({getLibrary, clearCurrentChapter, userId, ...props}) {

    useEffect(() => {
      
           getLibrary(userId)
           clearCurrentChapter()

       
    }, [])
  

    return <div>
        Home
    </div>
}

const mapStateToProps = (state) => {
   return {
       userId: state.auth.userId
   }
}

const mapDispatchToProps = dispatch => {
   return {

     getLibrary: (userId) => dispatch(retrieveLibrary(userId)),
     clearCurrentChapter: () => dispatch(clearCurrentChapter())
       
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)