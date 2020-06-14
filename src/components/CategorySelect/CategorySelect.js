import React from "react";
import { Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import "./CategorySelect.css";

function CategorySelect(props) {
  return (
    <Row className="categories-row">
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
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default CategorySelect;
