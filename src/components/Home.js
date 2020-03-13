import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { authorizeUserOrLogout } from '../actions/auth';
import {retrieveLibrary} from '../actions/library'

function Home({authorize, loggedIn, getLibrary, userId, history, ...props}) {

    useEffect(() => {
       if (loggedIn) {
           getLibrary(userId)
       }
    }, [])
  
    
    useEffect(() => {
        if (!loggedIn) {
            history.push("/welcome")
        }
    })

    return <div>
        Home
    </div>
}

const mapStateToProps = (state) => {
   return {
       loggedIn: state.auth.loggedIn,
       userId: state.auth.userId
   }
}

const mapDispatchToProps = dispatch => {
   return {

     authorize: () => dispatch(authorizeUserOrLogout()),
     getLibrary: (userId) => dispatch(retrieveLibrary(userId))
       
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)