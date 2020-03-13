import React from 'react'
import {connect} from 'react-redux'
import {CardDeck} from 'react-bootstrap'
import LibraryListBook from './LibraryListBook'
import {constructLibraryListBook} from '../utilities/helpers'


function LibraryBooks({library}) {
    return <CardDeck> 
          {library.userBooks.map(book => <LibraryListBook book={constructLibraryListBook(book)} /> )}
          </CardDeck>

}
const mapStateToProps = (state) => {
   return {
       library: state.library
   }
}

const mapDispatchToProps = (dispatch) => {

}


export default connect(mapStateToProps, mapDispatchToProps)(LibraryBooks)