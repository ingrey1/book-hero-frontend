import React from 'react'
import {connect} from 'react-redux'
import {loginWithGoogle} from '../actions/auth'



function SignIn(props) {
 
  return <div>
      <button onClick={() => props.loginWithGoogle(props.signInWithGoogle)}>SignIn</button>
  </div>
}

const mapDispatchToProps = (dispatch) => {

  return {
    loginWithGoogle: (f) => dispatch(loginWithGoogle(f)) 
  }

}

export default connect(null, mapDispatchToProps)(SignIn)