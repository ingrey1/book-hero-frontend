import React from "react";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import "./CategorySelect.css";
import { connect } from "react-redux";
import { setCategory } from "../../actions/browse";

function CategorySelect({ categories, setSelectedCategory }) {
  return (
    <Row className="categories-row">
      <Col className="romance-category col-text">
        <input
          type="image"
          src={require("../../assets/images/tree_logo.svg")}
          height="80px"
          width="75px"
          alt="all-category-image"
          className=" no-focus-outline"
        />
        <br />
        <label className="all-label">
          <strong>All</strong>
        </label>
      </Col>

      <Col className="romance-category col-text">
        <input
          type="image"
          src={require("../../assets/images/romance_icon.svg")}
          height="80px"
          width="75px"
          alt="romance-image"
          className="romance-image no-focus-outline"
        />
        <br />
        <label>
          <strong>Romance</strong>
        </label>
      </Col>

      <Col className="fiction-category col-text">
        <input
          type="image"
          src={require("../../assets/images/fiction_logo.svg")}
          height="80px"
          width="75px"
          alt="non-fiction-image"
          className="fantasy-image no-focus-outline"
        />
        <br />
        <label>
          <strong>Fantasy</strong>
        </label>
      </Col>

      <Col className="mystery-category col-text">
        <input
          type="image"
          src={require("../../assets/images/mystery_logo.svg")}
          height="80px"
          width="75px"
          alt="romance-image"
          className="mystery-image no-focus-outline"
        />
        <br />
        <label>
          <strong>Mystery</strong>
        </label>
      </Col>

      <Col className="literature-category col-text">
        <input
          type="image"
          src={require("../../assets/images/literature_logo.svg")}
          height="80px"
          width="75px"
          alt="literature-image"
          className="literature-image no-focus-outline"
        />
        <br />
        <label>
          <strong>Literature</strong>
        </label>
      </Col>

      <Col>
        <Dropdown className="no-focus-outline">
          <Dropdown.Toggle
            className="dropdown-toggle-category no-focus-outline"
            variant="success"
            id="dropdown-basic"
          >
            <label className="more-label">More</label>
            <div>
              <input
                type="image"
                src={require("../../assets/images/more_logo.svg")}
                height="80px"
                width="75px"
                alt="more-image"
                className="category-image no-focus-outline"
              />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category, i) => {
              return (
                <Dropdown.Item
                  key={Math.random()}
                  value={category}
                  onClick={e => setSelectedCategory(e.target.value.trim())}
                  as="button"
                >
                  {category}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedCategory: category => dispatch(setCategory(category))
  };
};

export default connect(null, mapDispatchToProps)(CategorySelect);
