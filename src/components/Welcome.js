import React, {useEffect} from 'react'
import SignIn from './SignIn'
import {connect} from 'react-redux' 



function Welcome({signInWithGoogle, loggedIn, history, location, ...props}) {

    useEffect(() => {
     console.log("use effect Welcome Comp")
     if (loggedIn) {
        history.push('/home')
     } else {
        if (location.path === "/") history.push('/welcome')
        
     } 
    })

    return <div>
       <SignIn signInWithGoogle={signInWithGoogle}  />
    </div>
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}


export default connect(mapStateToProps)(Welcome)