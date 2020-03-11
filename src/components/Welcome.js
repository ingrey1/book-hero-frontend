import React, {useEffect} from 'react'
import SignIn from './SignIn'
import {connect} from 'react-redux' 



function Welcome({loginFunctions, loggedIn, history, location, ...props}) {

    

    useEffect(() => {
     console.log("use effect Welcome Comp")
     if (loggedIn) {
        history.push('/home')
     } else {
        if (location.path === "/") history.push('/welcome')
        
     } 
    })

    return <div>
       <SignIn loginFunctions={loginFunctions}  />
    </div>
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}


export default connect(mapStateToProps)(Welcome)