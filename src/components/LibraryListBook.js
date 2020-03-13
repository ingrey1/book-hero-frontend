import React from 'react'
import {Card, Image} from 'semantic-ui-react'

function LibraryListBook({book, ...props }) {
  
    //debugger 
    return <Card style={{ width: '18rem', height: '15rem' }}>
    <Image  style={{height: '10rem'}} src={book.imageUrl} />
    <Card.Content>
      <Card.Header>{book.title}</Card.Header>
      
<Card.Description>{book.authors.map(a => `${a} ` )}</Card.Description>
      
      
      </Card.Content>

      
    
  </Card>

}

export default LibraryListBook