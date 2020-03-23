import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {retrieveLibrary} from '../actions/library'

function Home({getLibrary, userId, ...props}) {

    useEffect(() => {
      
           getLibrary(userId)
       
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

     getLibrary: (userId) => dispatch(retrieveLibrary(userId))
       
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)