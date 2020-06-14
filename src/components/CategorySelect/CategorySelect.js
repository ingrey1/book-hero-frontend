import React from "react";
import { Row } from "react-bootstrap";

function CategorySelect(props) {
  return <Row
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
}

export default CategorySelect;
