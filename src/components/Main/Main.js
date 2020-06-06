import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Welcome from '../Welcome/Welcome'
import Home from "../Home/Home"
import Navigation from "../Navigation/Navigation"
import Library from '../Library/Library'
import LibraryDetailBook from '../LibraryDetailBook/LibraryDetailBook'
import Reader from "../Reader/Reader"
import Profile from "../Profile/Profile"
import Refill from '../Refill/Refill'
import Browse from '../Browse/Browse'
import Write from '../Write/Write'
import "./Main.css"

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
         <Route exact path="/top_picks/:bookId" render={(routerProps) => loggedIn ? <LibraryDetailBook {...routerProps} />:<Redirect to="/welcome" />} />
         <Route exact path="/profile" render={(routerProps) => loggedIn ? <Profile {...routerProps} />:<Redirect to="/welcome" />    } />
         <Route exact path="/refill" render={(routerProps) => loggedIn ? <Refill {...routerProps} />:<Redirect to="/welcome" />    } />
         <Route exact path="/write" render={(routerProps) => loggedIn ? <Write {...routerProps} />:<Redirect to="/welcome" />    } />
         <Route exact path="/browse" render={(routerProps) => loggedIn ? <Browse {...routerProps} />:<Redirect to="/welcome" />    } />
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