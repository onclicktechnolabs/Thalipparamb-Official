import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";

const BannerSchema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  scheduleDate: Yup.date().required("Schedule Date is required"),
});

function BannerForm({ onSubmit, defaultValue }) {
  const formFields = [
    // {
    //   label: "Banner photo",
    //   name: "photo",
    //   type: "file",
    //   placeholder: "Upload photo",
    //   required: true,
    // },
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter title",
      required: false,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Enter description",
      required: false,
    },
    {
      label: "Schedule Date",
      name: "scheduleDate",
      type: "date",
      placeholder: "Select date",
      required: false,
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
    resolver: yupResolver(BannerSchema),
    defaultValues: defaultValue || {},
  });

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
              <h4 className="mb-1">New Banners</h4>
            </div>

            <div>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Banner photo
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

                {formFields.map((field) => (
                  <AutoFormField
                    key={field.name}
                    onChange={(value) => setValue(field.name, value)}
                    errors={errors}
                    {...field}
                  />
                ))}

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

export default BannerForm;
