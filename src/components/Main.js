import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Welcome from './Welcome'
import Home from "./Home"
import Navigation from "./Navigation"

function Main({signOut, signInWithGoogle, ...props}) {
   
   const loginFunctions = {
       signInWithGoogle
   }

    return <div>
        <Router>
         <Navigation />
         <Switch >
         <Route exact path="/home" render={(routerProps) => <Home {...routerProps}  /> }   />       
         <Route exact path="/welcome" render={(routerProps) => <Welcome {...routerProps} loginFunctions={loginFunctions}  /> }   />  
         <Route exact path="*" render={() => <Redirect to="/welcome" />}   />
           
        </Switch>
        </Router>
    </div>
} 

export default Main