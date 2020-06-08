import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Icon, IconGroup } from "semantic-ui-react";
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import { retrieveLibrary } from "../../actions/library";
import { retrieveAndSetBooks } from "../../actions/books";
import { clearCurrentChapter } from "../../actions/currentChapter";
import LibraryListBook from "../LibraryListBook/LibraryListBook";
import "./Home.css";

// const colStyle = {
//     marginTop: '25px'
// }

const titleStyle = {
  marginTop: "25px",
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
      <h2 style={titleStyle}>Categories</h2>
      <Row
        className="categories-row"
        style={{
          justifyContent: "space-between",
          marginLeft: "225px",
          marginRight: "225px",
        }}
      >
        <div className="romance-category">
          <input
            type="image"
            src={require("../../assets/images/romance_icon.svg")}
            name="saveForm"
            height="80px"
            width="75px"
            alt="romance-image"
            class="btTxt submit"
            id="saveForm"
          />
          <br />
          <label>Romance</label>
        </div>

        <div className="non-fiction-category">
          <input
            type="image"
            src={require("../../assets/images/non-fiction_icon.png")}
            name="saveForm"
            height="80px"
            width="75px"
            alt="romance-image"
            class="btTxt submit"
            id="saveForm"
          />
          <br />
          <label>Non-Fiction</label>
        </div>

        <div className="mystery-category">
          <input
            type="image"
            src={require("../../assets/images/mystery_icon.png")}
            height="80px"
            width="75px"
            name="saveForm"
            alt="romance-image"
            class="btTxt submit"
            id="saveForm"
          />
          <br />
          <label>Mystery</label>
        </div>

        <div className="fiction-category">
          <input
            type="image"
            src={require("../../assets/images/fiction_icon.png")}
            name="saveForm"
            height="80px"
            width="75px"
            alt="romance-image"
            class="btTxt submit"
            id="saveForm"
          />
          <br />
          <label>Fiction</label>
        </div>
      </Row>

      <h2 style={titleStyle}>Top Picks</h2>

      <Card.Group>
        {books &&
          books.map((book) => (
            <LibraryListBook key={book.id} topPick={true} book={book} />
          ))}
      </Card.Group>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLibrary: (userId) => dispatch(retrieveLibrary(userId)),
    clearCurrentChapter: () => dispatch(clearCurrentChapter()),
    setBooks: (userId) => dispatch(retrieveAndSetBooks(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
