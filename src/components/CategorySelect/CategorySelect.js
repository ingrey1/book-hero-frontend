import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CategorySelect.css";

function CategorySelect(props) {
  return (
    <Row className="categories-row">
      <Col className="romance-category">
        <input
          type="image"
          src={require("../../assets/images/romance_icon.svg")}
          height="80px"
          width="75px"
          alt="romance-image"
          className="romance-image"
        />
        <br />
        <label className="category-label">
          <strong>Romance</strong>
        </label>
      </Col>

      <Col className="non-fiction-category">
        <input
          type="image"
          src={require("../../assets/images/fiction_logo.svg")}
          height="80px"
          width="75px"
          alt="non-fiction-image"
          className="fantasy-image"
        />
        <br />
        <label className="category-label">
          <strong>Fantasy</strong>
        </label>
      </Col>

      <Col className="mystery-category">
        <input
          type="image"
          src={require("../../assets/images/mystery_logo.svg")}
          height="80px"
          width="75px"
          alt="romance-image"
          className="mystery-image"
        />
        <br />
        <label className="category-label">
          <strong>Mystery</strong>
        </label>
      </Col>

      <Col className="literature-category">
        <input
          type="image"
          src={require("../../assets/images/literature_logo.svg")}
          height="80px"
          width="75px"
          alt="literature-image"
          className="literature-image"
        />
        <br />
        <label className="category-label">
          <strong>Literature</strong>
        </label>
      </Col>

      <Col className="literature-category">
        <input
          type="image"
          src={require("../../assets/images/more_logo.svg")}
          height="80px"
          width="75px"
          alt="more-image"
          className="category-image"
        />
        <br />
        <label className="category-label">
          <strong>More</strong>
        </label>
      </Col>
    </Row>
  );
}

export default CategorySelect;
