import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { authorizeUserOrLogout } from '../actions/auth';

function Home({authorize, loggedIn, history, ...props}) {


  
    
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
       loggedIn: state.auth.loggedIn
   }
}

const mapDispatchToProps = dispatch => {
   return {

     authorize: () => dispatch(authorizeUserOrLogout())
       
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)