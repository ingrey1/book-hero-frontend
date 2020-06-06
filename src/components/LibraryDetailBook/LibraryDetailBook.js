import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Image, Grid, Button} from 'semantic-ui-react'
import {addBookAndUpdateStore} from '../../actions/library'



const cardStyle = {
    width: '500px',
    marginTop: '15px'
    
}
const imageStyle = {
    
}

const linkStyle = {
    color: "white"
}

const buttonStyle = {
    marginTop: '25px'
}

function LibraryDetailBook({books, userId, addBookToLibrary, location, allBooks, match, ...props}) {

    // note: make sure to handle case where user goes straight to library/bookId using url

    const handleAddToLibrary = (book) => {

      addBookToLibrary(userId, book.id)
      
    }

    const bookId = match.params.bookId
    const isTopPick = location.pathname.split("/")[1] === 'top_picks'
    console.log(isTopPick)
    const thisBook = isTopPick ? allBooks.find(b => b.id == bookId) : books.find(b => b.id == bookId)
    console.log("this book", thisBook) 
    console.log("location", location)
    return <Grid>
        
       

       
       <Grid.Column>
       <Grid.Row>
        <Card.Group> 
       <Card style={cardStyle}>
    <Image src={thisBook.image_url} style={imageStyle} wrapped ui={false} />
    
    
  </Card>
  <Card style={cardStyle}>
  <Card.Content>
    <Card.Header>{thisBook.title}</Card.Header>
      
      <Card.Description>
        {thisBook.description}
      </Card.Description>
    </Card.Content>
  </Card>
  <Card style={cardStyle}>
      <Card.Content>
      {!isTopPick ? (<Button color="blue" style={buttonStyle}><Link style={linkStyle} to="/library">Back To Library</Link></Button>):(<Button color="blue" style={buttonStyle}><Link style={linkStyle} to="/home">Back To Top Picks</Link></Button>)}<br />
      {!isTopPick ? (<Button color="blue" style={buttonStyle}><Link style={linkStyle} to={`/reader/read/${bookId}`}>Read</Link></Button>): <Button onClick={() => handleAddToLibrary(thisBook)} color="blue" style={buttonStyle}><Link style={linkStyle} to={`/home`}>Add To Library</Link></Button>}

      </Card.Content>
  </Card>
  </Card.Group>
  </Grid.Row>
  </Grid.Column>
  </Grid>
   


}

const mapStateToProps = (state) => {
    return {
        books: state.library.userBooks,
        allBooks: state.books,
        userId: state.auth.userId
    }
 }
 
 const mapDispatchToProps = (dispatch) => {

      return {
         
        addBookToLibrary: (userId, bookId) => dispatch(addBookAndUpdateStore(userId, bookId))

      }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LibraryDetailBook)