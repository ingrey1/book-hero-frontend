import React from 'react'
import SignIn from './SignIn'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'


function Main({signOut, signInWithGoogle}) {
    // routes declared here
   // <SignIn signInWithGoogle={signInWithGoogle} />
   const loginFunctions = {
       signInWithGoogle,
       signOut
   }

    return <div>
        <Router>
         <Switch >   
           <Route exact to="/welcome" render={(routerProps) => <Welcome {...routerProps} loginFunctions={loginFunctions}  /> }   />
           <Route />
           <Route />
           <Route />
           <Route to="*" component={<Redirect to="/welcome" />} />
        </Switch>
        </Router>
    </div>
} 

export default Main