import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { retrieveLibrary } from "../../actions/library";
import { retrieveAndSetBooks } from "../../actions/books";
import { clearCurrentChapter } from "../../actions/currentChapter";
import CategorySelect from "../CategorySelect/CategorySelect";
import { getAllCategories } from "../../utilities/helpers";
import "./Home.css";
import BookBrowserResults from "../BookBrowserResults/BookBrowserResults";
import BookBrowserControls from "../BookBrowserControls/BookBrowserControls";
import { capitalizeWords } from "../../utilities/helpers";
function Home({
  userId,
  userBooks,
  books,
  selectedCategory,
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
    <Container fluid className="primary-color container-custom">
      <Row className="category-select-title">
        <h2>Category Select</h2>
      </Row>
      <CategorySelect categories={getAllCategories(userBooks)} />
      <hr className="divider" />
      <Row className="current-category-title">
        <h1 className="m-auto">
          {selectedCategory && capitalizeWords(selectedCategory)}
        </h1>
      </Row>
      <BookBrowserControls novels={userBooks} />
      <BookBrowserResults />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    books: state.books,
    userBooks: state.library.userBooks,
    selectedCategory: state.browse.category
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
