import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./LibraryListBook.css";

const bookContainerStyle = {
  margin: "25px",
};

function LibraryListBook({ book, topPick, ...props }) {
  // console.log(book, "book")
  //debugger

  return (
    
     

      <Link
        style={bookContainerStyle}
        to={topPick ? `/top_picks/${book.id}` : `/library/${book.id}`}
      >
        <Card style={{ width: "15rem", height: "20rem" }}>
          <Image style={{ height: "10rem" }} src={book.image_url} />
          <Card.Content>
            <Card.Header>{book.title}</Card.Header>

            <Card.Description>
              {book.authors
                ? book.authors.map((a) => `${a} `)
                : book.author.name}
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>
    
  );
}

export default LibraryListBook;
