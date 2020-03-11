import React, {useEffect} from 'react'
import SignIn from './SignIn'
import {connect} from 'react-redux' 
import { authorizeUserOrLogout } from '../actions/auth'


function Welcome({signInWithGoogle, login, handleAuth}) {

    useEffect(() => {
      handleAuth()
    }, [])

    return <div>
       <SignIn signInWithGoogle={signInWithGoogle}  />
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        handleAuth: () => dispatch(authorizeUserOrLogout()) 
    }
}

export default connect(null, mapDispatchToProps)(Welcome)