import React from 'react'
import {connect} from 'react-redux'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import {Form, FormControl, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {clearUserStoreAndLogout} from '../actions/auth'



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

        return <NavBar>
           <Nav className="mr-auto">

           <LinkContainer to="/library" exact={true}>
              <Nav.Link className="nav-link">My Library</Nav.Link>
           </LinkContainer>

           <LinkContainer to="/write" exact={true}>
              <Nav.Link>Write</Nav.Link>
           </LinkContainer>

           <LinkContainer to="/browse" exact={true}>
              <Nav.Link>Browse</Nav.Link>
           </LinkContainer>    

           <Form inline>
              <FormControl type="text" placeholder="Search Books and Stories" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
           </Form>

           <LinkContainer to="/welcome" exact={true}>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
           </LinkContainer>
          

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