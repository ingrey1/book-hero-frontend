import React from "react";
import { Row, Col } from "react-bootstrap";
import { Input } from "semantic-ui-react";
import "./BookBrowserControls.css";
import DataListInput from "react-datalist-input";

function BookBrowserControls({ novels }) {
  const onNovelSelect = novel => {
    console.log("novel", novel);
  };

  return (
    <Row>
      <Col></Col>
      <Col></Col>
      <Col>
        <DataListInput
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
        <div>
          {/* <Input
            className="data-list"
            list="novels"
            action="Search"
            onChange={e => onNovelSelect(e.target.value)}
            placeholder="Search Novels..."
          />
          <datalist id="novels" className="novel-datalist">
            {novels &&
              novels.map(novel => {
                return <option value={novel.title}></option>;
              })}
          </datalist> */}
        </div>
      </Col>
    </Row>
  );
}

export default BookBrowserControls;
