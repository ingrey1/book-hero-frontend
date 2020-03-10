import React from 'react'

function SignIn(props) {
  


  const {signInWithGoogle} = props
  
  return <div>
      <button onClick={signInWithGoogle}></button>
  </div>
}

export default SignIn