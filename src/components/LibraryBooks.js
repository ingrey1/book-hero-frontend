import React from 'react'
import {connect} from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import LibraryListBook from './LibraryListBook'
import {constructLibraryListBook} from '../utilities/helpers'


function LibraryBooks({library}) {
    console.log(library)
    return <Grid columns={4} divided style={{padding: '20px'}}>
      <Card.Group>
      {library.userBooks.map(book => <LibraryListBook key={Math.random()}  book={constructLibraryListBook(book)} /> )}
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