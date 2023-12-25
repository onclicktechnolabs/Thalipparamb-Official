import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";

const programRegisterSchema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  name: Yup.string().required("Required Field"),
  phone: Yup.string().required("Required Field"),
  program: Yup.string().required("Required Field"),
  date: Yup.string().required("Required Field"),
  token: Yup.string().required("Required Field"),
});

function ProgramRegisterForm({ onSubmit, defaultValue }) {
  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Your name",
      required: false,
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Your phone number",
      required: false,
    },
    {
      label: "program",
      name: "program",
      type: "select",
      placeholder: "",
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
      label: "Date",
      name: "date",
      type: "date",
      placeholder: "",
      required: false,
    },
    {
      label: "Token",
      name: "token",
      type: "text",
      placeholder: "",
      required: false,
    },
  ];

  const options = [
    { label: " Events/Functions", value: "Events" },
    { label: "Inaguration", value: "Inaguration" },
    { label: "ProgramRegister", value: "ProgramRegister" },
  ];

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(programRegisterSchema),
    defaultValues: defaultValue || {},
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <Row className="mb-8 d-flex justify-content-center align-items-center  my-10 w-75">
      <Col xl={10} lg={10} md={12} xs={12}>
        <Card className="w-100">
          <Card.Body>
            <div className=" my-6 text-center">
              <h4 className="mb-1">Register For Happiness Program</h4>
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

export default ProgramRegisterForm;
