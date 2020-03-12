import React from 'react'
import NavBar from 'react-bootstrap/Navbar'

function Navigation({readerMode, loggedIn,...props}) {
   



    
    if (!loggedIn) {
        return <NavBar>
       
       

       <NavBar.Brand>
           Book Hero
       </NavBar.Brand>

    </NavBar>
    
    } else if (!readerMode) { // logged in, not in the reader

        return <NavBar>
        <NavBar.Brand>
            Book Hero
        </NavBar.Brand>
 
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

export default connect(mapStateToProps)(Navigation)