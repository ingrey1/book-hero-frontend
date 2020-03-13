import React from 'react'
import {Card} from 'react-bootstrap'

function LibraryListBook({book: {title, author, imageUrl} }) {

    return <Card style={{ width: '18rem' }}>
    <Card.Img variant="left" src={imageUrl} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
{author.map(a => <h5>{a}</h5> )}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>

}

export default LibraryListBook