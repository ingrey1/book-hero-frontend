import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Welcome from './Welcome'

function Main({signOut, signInWithGoogle}) {
   
   const loginFunctions = {
       signInWithGoogle
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