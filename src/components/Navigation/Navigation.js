import React from 'react'
import {connect} from 'react-redux'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import {Form, FormControl, Button, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {clearUserStoreAndLogout} from '../../actions/auth'
import "./Navigation.css"

const linkContainerStyle = {
    marginleft: '25px',
    marginRight: '25px'
}

function Navigation({readerMode, logout, loggedIn,...props}) {

    
    if (!loggedIn) {
        return <NavBar>
       <Nav>
     
       <Nav.Item>   
       <NavBar.Brand>
            About
        </NavBar.Brand>
        </Nav.Item>
        </Nav>
    
      <Nav className="justify-content-end">  
        <Nav.Item> 
       <NavBar.Brand>
           Book Hero
       </NavBar.Brand>
       </Nav.Item>
      

      </Nav>
    </NavBar>
   
    
    } else if (!readerMode) { // logged in, not in the reader

        return <NavBar className="justify-content-center">
           <Nav className="mr-auto">

           <LinkContainer style={linkContainerStyle} to="/home" exact={true}>
              <Nav.Link className="nav-link">Home</Nav.Link>
           </LinkContainer>
         
           <LinkContainer style={linkContainerStyle} to="/library" exact={true}>
              <Nav.Link className="nav-link">My Library</Nav.Link>
           </LinkContainer>

           <LinkContainer style={linkContainerStyle} to="/write" exact={true}>
              <Nav.Link>Write</Nav.Link>
           </LinkContainer>

           <LinkContainer style={linkContainerStyle} to="/browse" exact={true}>
              <Nav.Link>Browse</Nav.Link>
           </LinkContainer>    

           <Form style={linkContainerStyle} inline>
              <FormControl type="text" placeholder="Search Books and Stories" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
           </Form>
           <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item ><LinkContainer to="/profile" exact={true}>
              <Nav.Link>Profile</Nav.Link>
           </LinkContainer></NavDropdown.Item>

           <NavDropdown.Item ><LinkContainer to="/refill" exact={true}>
              <Nav.Link>Refill Book Bucks</Nav.Link>
           </LinkContainer></NavDropdown.Item>

        <NavDropdown.Item><LinkContainer to="/welcome" exact={true}>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
           </LinkContainer></NavDropdown.Item>
        
      </NavDropdown>
          

           </Nav>
 
     </NavBar>

    } else  { // logged in, using reader mode
        return <NavBar>
       
       

       <NavBar.Brand>
           Book Hero
       </NavBar.Brand>

    </NavBar>
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        readerMode: state.currentChapter.readerMode
    }
}

const mapDispatchToProps = dispatch => {
    return {

        logout: () => dispatch(clearUserStoreAndLogout())

    }
    

}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)