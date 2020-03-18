import React from 'react'
import {connect} from 'react-redux'


function Reader({books, match, ...props}) {

    useEffect(() => {
        // if the chapter information isnt available for the given book, retrieve it
    })
 
    const bookId = match.params.bookId
    const thisBook = books.find(b => b.id == bookId) 

    const handleStartReaderMode = () => {
      
    }

    return <div id="reader-container">
       <p>book title: {thisBook.title}</p>
       <button onClick={handleStartReaderMode}>Read This Book</button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reader)