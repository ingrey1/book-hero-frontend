import React from 'react'
import {connect} from 'react-redux'
import {Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function LibraryDetailBook({books, match, ...props}) {

    // note: make sure to handle case where user goes straight to library/bookId using url
    const bookId = match.params.bookId
    const thisBook = books.find(b => b.id == bookId) 
     
    return <Col>
    
        <p>title: {thisBook.title}</p>
        <Link to="/library">Back To Library</Link><br />
        <Link to={`/reader/read/${bookId}`}>Read</Link>
        
        
       
    
    </Col>


}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {


      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryDetailBook)