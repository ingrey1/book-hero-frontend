import React from 'react'
import SignIn from './SignIn'


function Main({signOut, signInWithGoogle}) {
    // routes declared here
   

    return <div>
        <SignIn signInWithGoogle={signInWithGoogle} />
    </div>
} 

export default Main