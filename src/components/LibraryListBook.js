import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const bookContainerStyle =  {
  marginTop: '25px' 
}

function LibraryListBook({book, ...props }) {
  
    //debugger 
    return <Link style={bookContainerStyle} to={`/library/${book.id}`}><Card style={{ width: '15rem', height: '20rem' }}>
    <Image  style={{height: '10rem'}} src={book.imageUrl} />
    <Card.Content>
      <Card.Header>{book.title}</Card.Header>
      
<Card.Description>{book.authors.map(a => `${a} ` )}</Card.Description>
      
      
      </Card.Content>

      
    
  </Card>
  </Link>

}

export default LibraryListBook