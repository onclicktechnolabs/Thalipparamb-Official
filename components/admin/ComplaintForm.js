import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";
import { useTranslations } from "next-intl";

const complaintSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  ward: Yup.string().required("Ward is required"),
  locality: Yup.string().required("Panchayath/municipality is required"),
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
  // priority: Yup.string().required("Priority is required"),
});

function ComplaintForm({ onSubmit, defaultValue, loginData }) {
  const t = useTranslations("complaint")
  const formFields = [
    {
      label: t("name"),
      name: "name",
      type: "text",
      placeholder: t("name-p"),
      required: false,
    },
    {
      label: t("phone"),
      name: "phone",
      type: "tel",
      placeholder: t("phone-p"),
      required: false,
    },
    {
      label: t("address"),
      name: "address",
      type: "text",
      placeholder: t("address-p"),
      required: false,
    },

    {
      label: t("ward"),
      name: "ward",
      type: "text",
      placeholder: t("ward-p"),
      required: false,
    },
    {
      label: t("locality"),
      name: "locality",
      type: "select",
      placeholder: t("locality-p"),
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
      label: t("subject"),
      name: "subject",
      type: "text",
      placeholder: t("subject-p"),
      required: false,
    },
    {
      label: t("description"),
      name: "description",
      type: "textarea",
      placeholder: t("description-p"),
      required: false,
    },
  ];
  const options = [
    { label: "Events/Functions", value: "events" },
    { label: "Inauguration", value: "inauguration" },
    { label: "Complaint", value: "complaint" },
  ];
  const [files, setFiles] = useState([]);

  const [type, setType] = useState("");
  const [fileError, setFileError] = useState("");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(complaintSchema),
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
      <Col xl={10} lg={10} md={12} xs={12} className="w-100 w-md-75 w-lg-50 px-4">
        <Card>
          <Card.Body>
            <div className=" my-6 text-center">
              <h4 className="mb-1">{t("register")}</h4>
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
                    {t("upload")}
                  </label>
                  <div className="col-md-8 col-12">
                    <div
                      action="#"
                      className="dropzone mb-3  border-dashed "
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
                    <Button variant="outline-white" onClick={() => setFiles([])}>Clear</Button>
                    <Button variant="primary" type="submit">{t("submit")}</Button>
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

export default ComplaintForm;
