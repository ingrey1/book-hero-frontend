import React from "react";
import { Row, Col } from "react-bootstrap";
import "./BookBrowserControls.css";
import DataListInput from "react-datalist-input";
import { Button, Icon } from "semantic-ui-react";

function BookBrowserControls({ novels }) {
  const onNovelSelect = novel => {
    console.log("novel", novel);
  };

  const onNovelSearchTextChange = e => {
    console.log(e, "e");
  };

  return (
    <Row>
      <Col></Col>
      <Col></Col>
      <Col>
        <DataListInput
          onInput={onNovelSearchTextChange}
          onSelect={onNovelSelect}
          requiredInputLength={1}
          placeholder="Search Novels..."
          inputClassName="search-input-field"
          itemClassName="search-datalist-item"
          dropDownClassName="search-datalist"
          activeItemClassName="search-datalist-active-item"
          items={novels.map(novel => {
            return { ...novel, key: novel.title, label: novel.title };
          })}
        />
      </Col>
    </Row>
  );
}

export default BookBrowserControls;
