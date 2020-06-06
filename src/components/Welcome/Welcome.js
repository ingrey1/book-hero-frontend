import React, {useEffect} from 'react'
import SignIn from '../SignIn/SignIn'
import {connect} from 'react-redux' 
import {authorizeUserOrLogout} from '../../actions/auth'




function Welcome({user, firebaseAppAuth, providers,authorize, loginFunctions, loggedIn, history, location, ...props}) {

    useEffect(() => {
        console.log("use effect welcome comp, called just once")
        authorize()
     }, [])

    useEffect(() => {
     console.log("use effect Welcome Comp, called every time")
     if (loggedIn) {
        history.push('/home')
     } else {
        if (location.path === "/") history.push('/welcome')
        
     } 
    })

    return <div>
       <SignIn user={user} firebaseAppAuth={firebaseAppAuth} providers={providers} loginFunctions={loginFunctions}  />
    </div>
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
 
      authorize: () => dispatch(authorizeUserOrLogout())
        
    }
 }


export default connect(mapStateToProps, mapDispatchToProps)(Welcome)