import React from 'react'
import {connect} from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import _ from 'underscore'
import LibraryListBook from './LibraryListBook'
import {constructLibraryListBook, doubleFilterByTitleAndCategory} from '../utilities/helpers'


function LibraryBooks({library: {userBooks, displayOptions: {filter: {categories, titleSearch}, sort: { property, ascending }}}, ...props}) {
    
    const properlyShapedBooks = userBooks.map(book => constructLibraryListBook(book))
    const filteredBooks = doubleFilterByTitleAndCategory(properlyShapedBooks, titleSearch, categories) 
    const ascendingStatus = (property === 'last_read' || property === 'last_added_to_library') ? !ascending : ascending  
    const sortedBooks = ascendingStatus ? _.sortBy(filteredBooks, property) : _.sortBy(filteredBooks, property).reverse() 
     


    return <Grid columns={4} divided style={{padding: '20px'}}>
      <Card.Group>
      {sortedBooks.map(book => <LibraryListBook key={Math.random()}  book={book} /> )}
      </Card.Group>
   
  </Grid>
          

}
const mapStateToProps = (state) => {
   return {
       library: state.library
   }
}

const mapDispatchToProps = (dispatch) => {
     return {

     }
}


export default connect(mapStateToProps, mapDispatchToProps)(LibraryBooks)