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
  const formFields = [
    {
      label: "പേര്",
      name: "title",
      type: "text",
      placeholder: "നിങ്ങളുടെ പേര് നൽകുക",
      required: false,
    },
    {
      label: "ഫോൺ നമ്പർ",
      name: "phone",
      type: "tel",
      placeholder: "നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
      required: false,
    },
    {
      label: "വിലാസം",
      name: "address",
      type: "text",
      placeholder: "നിങ്ങളുടെ വിലാസം നൽകുക",
      required: false,
    },
    {
      label: "പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി",
      name: "panchayath",
      type: "select",
      placeholder: "പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി",
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
      label: "വാർഡ് നമ്പർ",
      name: "ward",
      type: "text",
      placeholder: "നിങ്ങളുടെ വാർഡ് നമ്പർ നൽകുക",
      required: false,
    },
    {
      label: "വിഷയം",
      name: "subject",
      type: "text",
      placeholder: "വിഷയം നൽകുക",
      required: false,
    },
    {
      label: "വിവരണം",
      name: "description",
      type: "textarea",
      placeholder: "വിവരണം",
      required: false,
    },
  ];
  const options = [
    { label: " Events/Functions", value: "Events" },
    { label: "Inaguration", value: "Inaguration" },
    { label: "Complaint", value: "Complaint" },
  ];
  const [files, setFiles] = useState([]);

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
                      പരാതിയുടെ തരം തിരഞ്ഞെടുക്കുക
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
                    ഫയലുകൾ അപ്‌ലോഡ് ചെയ്യുക
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
                    Submit
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
