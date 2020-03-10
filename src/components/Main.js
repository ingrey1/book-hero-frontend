import React from 'react'
import SignIn from 'SignIn'


function Main(props) {
    // routes declared here
    const {signInWithGoogle, signOut} = props

    return <div>
        <SignIn signInWithGoogle={signInWithGoogle} />
    </div>
} 

export default Main