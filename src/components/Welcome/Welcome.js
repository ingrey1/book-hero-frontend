import React, {useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import SignIn from '../SignIn/SignIn'
import {connect} from 'react-redux' 
import {authorizeUserOrLogout} from '../../actions/auth'
import "./Welcome.css"



function Welcome({user, firebaseAppAuth, providers,authorize, loginFunctions, loggedIn, history, location, ...props}) {

    useEffect(() => {
        console.log("use effect welcome comp, called just once")
        authorize()
     }, [])

    useEffect(() => {
     console.log("use effect Welcome Comp, called every time")
     if (loggedIn) {
        history.push('/home')
     } else {
        if (location.path === "/") history.push('/welcome')
        
     } 
    })

    return <Container>
        
        {/* SignIn Component and Background Book Image */}

       <Row>
         <Col>
           <div id="background-image-div">
                 background image div
           </div>
         </Col> 
         <Col><SignIn user={user} firebaseAppAuth={firebaseAppAuth} providers={providers} loginFunctions={loginFunctions}  /></Col>
         
        </Row>

        <Row>Divider Row</Row>
           
        <Row>

           {/* About Book Hero Section */}
           <Col>Description</Col>
           <Col>Book Image 1</Col>
           <Col>Book Image 2</Col>
           <Col>Book Image 3</Col>
           
          
        
            
        </Row> 

        <Row>Divider Row</Row>

          {/* Personal Testamonial */}
         
         

        <Row>
            
            <Col>User Image</Col>
            <Col>Testamnial Text</Col>

        </Row>
 

    </Container>
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
 
      authorize: () => dispatch(authorizeUserOrLogout())
        
    }
 }


export default connect(mapStateToProps, mapDispatchToProps)(Welcome)