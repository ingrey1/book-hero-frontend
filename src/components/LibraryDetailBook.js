import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Image, Grid, Button} from 'semantic-ui-react'



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

function LibraryDetailBook({books, match, ...props}) {

    // note: make sure to handle case where user goes straight to library/bookId using url
    const bookId = match.params.bookId
    const thisBook = books.find(b => b.id == bookId) 
     
    return <Grid>
        
       
{/*         
        <p>title: {thisBook.title}</p>
        <Link to="/library">Back To Library</Link><br />
        <Link to={`/reader/read/${bookId}`}>Read</Link> */}
       
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
      <Button color="blue" style={buttonStyle}><Link style={linkStyle} to="/library">Back To Library</Link></Button><br />
      <Button color="blue" style={buttonStyle}><Link style={linkStyle} to={`/reader/read/${bookId}`}>Read</Link></Button>

      </Card.Content>
  </Card>
  </Card.Group>
  </Grid.Row>
  </Grid.Column>
  </Grid>
   


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