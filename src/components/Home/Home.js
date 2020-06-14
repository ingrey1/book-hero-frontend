import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Container, Col, Row } from "react-bootstrap";
import { retrieveLibrary } from "../../actions/library";
import { retrieveAndSetBooks } from "../../actions/books";
import { clearCurrentChapter } from "../../actions/currentChapter";
import CategorySelect from "../CategorySelect/CategorySelect";
import "./Home.css";
import BookBrowserResults from "../BookBrowserResults/BookBrowserResults";
import BookBrowserControls from "../BookBrowserControls/BookBrowserControls";

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
    <Container fluid>
      <Row className="category-select-title">
        <h2>Category Select</h2>
      </Row>
      <CategorySelect />
      <Row className="current-category-title">
        <h1 className="m-auto">Top Picks</h1>
      </Row>
      <BookBrowserControls />
      <BookBrowserResults />
    </Container>
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
