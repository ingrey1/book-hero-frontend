import React from 'react'
import {connect} from 'react-redux'
import LibraryListBook from './LibraryListBook'
import {generateCardGrid, constructLibraryListBook} from '../utilities/helpers'


function LibraryBooks({library}) {
    return generateCardGrid(library.userBooks.map(
        book => <LibraryListBook book={constructLibraryListBook(book)} /> ))

}
const mapStateToProps = (state) => {
   return {
       library: state.library
   }
}

const mapDispatchToProps = (dispatch) => {

}


export default connect(mapStateToProps, mapDispatchToProps)(LibraryBooks)