import React from "react";
import { Row } from "react-bootstrap";

function inputFields({ title }) {
  return (
    <Row className="mb-3">
      <label
        htmlFor="fullName"
        className="col-sm-4 col-form-label
      form-label"
      >
        {title}
      </label>
      <div className="col-md-8 col-12">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          id="fullName"
          required
        />
      </div>
    </Row>
  );
}

export default inputFields;
