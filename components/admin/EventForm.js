import React, { useEffect, useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DropFiles } from "widgets";

const eventSchema = Yup.object().shape({
  title_en: Yup.string().required("Please provide a english title."),
  title_ml: Yup.string().required("Please provide a malayalam title."),
  description_en: Yup.string().required("Please provide a english description."),
  description_ml: Yup.string().required("Please provide a malayalam description."),
  venue: Yup.string().required("Please provide a venue."),
  start_date: Yup.string().required("Please provide a start date."),
  end_date: Yup.string().required("Please provide a start date."),
  status: Yup.string().required("Please provide a status."),
});

function EventForm({ onSubmit, defaultValue }) {
  const formFields = [
    {
      label: "Title in english",
      name: "title_en",
      type: "text",
      placeholder: "Enter title in english",
      required: true,
    },
    {
      label: "Title in malayalam",
      name: "title_ml",
      type: "text",
      placeholder: "Enter title in malayalam",
      required: false,
    },
    {
      label: "Description in english",
      name: "description_en",
      type: "text",
      placeholder: "Enter description in english",
      required: true,
    },
    {
      label: "Description in malayalam",
      name: "description_ml",
      type: "text",
      placeholder: "Enter description in malayalam",
      required: false,
    },
    {
      label: "venue",
      name: "venue",
      type: "text",
      placeholder: "Enter venue",
      required: false,
    },
    {
      label: "Start date",
      name: "start_date",
      type: "date",
      placeholder: "Select date",
      required: false,
    },
    {
      label: "End date",
      name: "end_date",
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: defaultValue || {},
  });

  useEffect(() => {
    if (defaultValue) {
      setStartDate(defaultValue?.start_date)
      setEndDate(defaultValue?.end_date)
    }
  }, [defaultValue])

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
                  field.type === 'date' ?
                    <AutoFormField
                      key={field.name}
                      onChange={(value) => {
                        if (field.name === "start_date") {
                          setStartDate(value);
                        } else {
                          setEndDate(value);
                        }
                        setValue(field.name, value);
                      }}
                      errors={errors}
                      value={field.name === "start_date" ? startDate : endDate}
                      {...field}
                    /> :
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

                  </div>
                </Row>

                <Row>
                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4 d-flex justify-content-between gap-2">
                    <Button
                      variant="outline-white"
                      onClick={() => setFiles([])}
                    >
                      Clear
                    </Button>
                    <Button variant="primary" type="submit">
                      Create
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EventForm;
