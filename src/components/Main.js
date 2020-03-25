import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Welcome from './Welcome'
import Home from "./Home"
import Navigation from "./Navigation"
import Library from './Library'
import LibraryDetailBook from './LibraryDetailBook'
import Reader from "./Reader"


function Main({signOut, user, firebaseAppAuth, providers, signInWithGoogle, signInWithEmailAndPassword, createUserWithEmailAndPassword, loggedIn, ...props}) {
   
   const loginFunctions = {
       signInWithGoogle,
       signInWithEmailAndPassword,
       createUserWithEmailAndPassword
   }

    return <div>
        <Router>
         <Navigation />
         <Switch >
         <Route exact path="/home" render={(routerProps) => loggedIn ? <Home {...routerProps}  /> : <Redirect to="/welcome" />  }   />       
         <Route exact path="/welcome" render={(routerProps) => <Welcome user={user} firebaseAppAuth={firebaseAppAuth} providers={providers} {...routerProps} loginFunctions={loginFunctions}  /> }   /> 
         <Route exact path="/library" render={(routerProps) => loggedIn ? <Library {...routerProps} />:<Redirect to="/welcome" />    } />
         <Route exact path="/reader/read/:bookId" render={(routerProps) =>  loggedIn ? <Reader {...routerProps} /> : <Redirect to="/welcome" />} />
         <Route exact path="/library/:bookId" render={(routerProps) => loggedIn ? <LibraryDetailBook {...routerProps} />:<Redirect to="/welcome" />} />
         <Route exact path="*" render={() => <Redirect to="/welcome" />}   />
           
        </Switch>
        </Router>
    </div>
} 

const mapStateToProps = (state) => {

    return {
        loggedIn: state.auth.loggedIn

    }

}



export default connect(mapStateToProps)(Main)