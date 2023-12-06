import { useState } from "react";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

import { FormSelect, DropFiles } from "widgets";

function GeneralForm() {
  const [files, setFiles] = useState([]);

  return (
    <Row className="mb-8 d-flex justify-content-center align-items-center">
      {/* <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">
            Profile configuration settings{" "}
          </p>
        </div>
      </Col> */}
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Add Events</h4>
            </div>

            <div>
              {/* border */}
              {/* <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div> */}
              <Form>
                <Row className="mb-3">
                  {/* <Col md={3} className="mb-3 mb-md-0">
                    
                    <h5 className="mb-0">Event photo</h5>
                  </Col> */}
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Event photo
                  </label>
                  {/* <Col md={9}> */}
                  {/* dropzone input */}
                  <div className="col-md-8 col-12">
                    <div
                      action="#"
                      className="dropzone mb-3 py-10 border-dashed"
                    >
                      <DropFiles files={files} setFiles={setFiles} />
                    </div>
                    <Button
                      variant="outline-white"
                      onClick={() => setFiles([])}
                    >
                      Clear{" "}
                    </Button>
                  </div>
                  {/* </Col> */}
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Title
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
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-8 col-12">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      id="fullName"
                      required
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="date"
                    className="col-sm-4 col-form-label
                    form-label"
                  >
                    Shedule Date
                  </label>
                  <div className="col-md-8 col-12">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="date"
                      id="date"
                      required
                    />
                  </div>
                </Row>

                {/* Location */}
                {/* <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="country">
                    Location
                  </Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control
                      as={FormSelect}
                      placeholder="Select Country"
                      id="country"
                      options={countryOptions}
                    />
                  </Col>
                </Row> */}
                <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Col>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GeneralForm;
