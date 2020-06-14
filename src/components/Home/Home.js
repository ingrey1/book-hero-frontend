import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Icon, IconGroup } from "semantic-ui-react";
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Row
} from "react-bootstrap";
import { retrieveLibrary } from "../../actions/library";
import { retrieveAndSetBooks } from "../../actions/books";
import { clearCurrentChapter } from "../../actions/currentChapter";
import LibraryListBook from "../LibraryListBook/LibraryListBook";
import CategorySelect from "../CategorySelect/CategorySelect";
import "./Home.css";

// const colStyle = {
//     marginTop: '25px'
// }

const titleStyle = {
  marginTop: "25px"
};

function Home({
  userId,
  books,
  setBooks,
  getLibrary,
  clearCurrentChapter,
  ...props
}) {
  useEffect(() => {
    setBooks(userId);
    getLibrary(userId);
    clearCurrentChapter();
  }, []);

  return (
    <div>
      <Row as="h2">Category Select</Row>
      
      <CategorySelect />

      <h2 style={titleStyle}>Top Picks</h2>

      <Card.Group>
        {books &&
          books.map(book => (
            <LibraryListBook key={book.id} topPick={true} book={book} />
          ))}
      </Card.Group>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLibrary: userId => dispatch(retrieveLibrary(userId)),
    clearCurrentChapter: () => dispatch(clearCurrentChapter()),
    setBooks: userId => dispatch(retrieveAndSetBooks(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
