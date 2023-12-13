import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";

const Complaintschema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  title: Yup.string().required("Title is required"),
  phone: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  panchayath: Yup.string().required("Panchayath is required"),
});

function ComplaintForm({ onSubmit, defaultValue, loginData }) {
  console.log(
    "🚀 ~ file: ComplaintForm.js:19 ~ ComplaintForm ~ loginData:",
    loginData
  );

  const formFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter title",
      required: false,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "Enter Phone Number",
      required: false,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Enter Address",
      required: false,
    },
    {
      label: "Panchayath",
      name: "panchayath",
      type: "select",
      placeholder: "Select Panchayath",
      required: false,
      options: [
        { label: " Thalipparamb", value: "Thalipparamb" },
        { label: "Alakode", value: "Alakode" },
        { label: "Chengalai", value: "Chengalai" },
        { label: "Irikkur", value: "Irikkur" },
        { label: "Payyavur", value: "Payyavur" },
      ],
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Enter description",
      required: false,
    },
  ];
  const options = [
    { label: " Events/Functions", value: "Events" },
    { label: "Inaguration", value: "Inaguration" },
    { label: "Complaint", value: "Complaint" },
  ];
  const [files, setFiles] = useState([]);
  console.log(
    "🚀 ~ file: ComplaintForm.js:74 ~ ComplaintForm ~ files:",
    files.length
  );
  const [type, setType] = useState("");
  console.log("🚀 ~ file: ComplaintForm.js:71 ~ ComplaintForm ~ type:", type);
  const [fileError, setFileError] = useState("");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Complaintschema),
    defaultValues: defaultValue || {},
  });

  const handleFormSubmit = (formData) => {
    if (files.length === 0) {
      setFileError("Please select a file");
    } else {
      const formDataWithFiles = {
        ...formData,
        type: type,
        files: files,
      };
      onSubmit(formDataWithFiles);
    }
  };

  return (
    <Row className="mb-8 d-flex justify-content-center align-items-center  ">
      <Col xl={10} lg={10} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Register Complaint</h4>
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
                {/* complaint type  */}
                {loginData?.role === "admin" && (
                  <Row className="mb-3">
                    <label
                      htmlFor={name}
                      className="col-sm-4 col-form-label form-label"
                    >
                      Select Complaint Type
                    </label>
                    <Col md={8} xs={12}>
                      <Form.Select
                        name="complaintType"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Select Complaint Type</option>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                )}

                {/*End complaint type  */}

                <Row className="mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-sm-4 col-form-label form-label"
                  >
                    Upload Files
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

export default ComplaintForm;
