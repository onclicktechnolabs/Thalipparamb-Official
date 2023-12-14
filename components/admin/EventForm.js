import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";

const Eventschema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  title: Yup.string().required("Title is required"),
  place: Yup.string().required("Place is required"),
  date: Yup.date().required("Date is required"),
  status: Yup.string().required("Status is required"),
});

function EventForm({ onSubmit, defaultValue }) {
  const formFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter title",
      required: false,
    },
    {
      label: "Venu",
      name: "place",
      type: "text",
      placeholder: "Enter Venu",
      required: false,
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      placeholder: "Select date",
      required: false,
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      placeholder: "Select status",
      required: false,
      options: [
        { label: " Planned", value: "Planned" },
        { label: " In Progress", value: "In-Progress" },
        { label: " Completed", value: "Completed" },
        { label: " Cancelled", value: "Cancelled" },
      ],
    },
  ];

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Eventschema),
    defaultValues: defaultValue || {},
  });
  console.log("🚀 ~ file: EventForm.js:60 ~ EventForm ~ errors:", errors);

  const handleFormSubmit = (formData) => {
    if (files.length === 0) {
      setFileError("Please select an image file");
    }
    const formDataWithFiles = {
      ...formData,
      files: files,
    };
    onSubmit(formDataWithFiles);
  };

  return (
    <Row className="mb-8 d-flex justify-content-center align-items-center  ">
      <Col xl={10} lg={10} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">New Events</h4>
            </div>

            <div>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                {formFields.map((field) => (
                  <AutoFormField
                    key={field.name}
                    onChange={(value) => setValue(field.name, value)}
                    errors={errors}
                    {...field}
                  />
                ))}

                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Poster
                  </label>
                  <div className="col-md-8 col-12">
                    <div
                      action="#"
                      className="dropzone mb-3 py-10 border-dashed"
                    >
                      <DropFiles files={files} setFiles={setFiles} />
                    </div>
                    {fileError && (
                      <Col md={8} xs={12}>
                        <span className="col-sm-4 col-form-label form-label text-danger">
                          {fileError}
                        </span>
                      </Col>
                    )}
                    <Button
                      variant="outline-white"
                      onClick={() => setFiles([])}
                    >
                      Clear
                    </Button>
                  </div>
                </Row>
                <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                  <Button variant="primary" type="submit">
                    Create
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

export default EventForm;
