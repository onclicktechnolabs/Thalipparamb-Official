import React, { useState } from "react";
import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, DropFiles } from "widgets";

const ProgramRegisterschema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  name: Yup.string().required("Required Field"),
  phone: Yup.string().required("Required Field"),
  panchayath: Yup.string().required("Required Field"),
  ward: Yup.string().required("Required Field"),
  bussinessType: Yup.string().required("Required Field"),
  problemSolve: Yup.string().required("Required Field"),
  planToSolve: Yup.string().required("Required Field"),
  howToSolve: Yup.string().required("Required Field"),
  howToSuccess: Yup.string().required("Required Field"),
  typeOfCustomer: Yup.string().required("Required Field"),
  planToMarketing: Yup.string().required("Required Field"),
  typeOfSupport: Yup.string().required("Required Field"),
});

function ProgramRegisterForm({ onSubmit, defaultValue }) {
  const formFields = [
    {
      label: "പേര് ",
      name: "name",
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
      label: "പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി",
      name: "panchayath",
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
      label: "വാർഡ് നമ്പർ",
      name: "ward",
      type: "text",
      placeholder: "വാർഡ് നമ്പർ",
      required: false,
    },
    {
      label: "ഏതു സെക്ടറിൽ ആണ് ബിസിനസ് തുടങ്ങുവാൻ ആഗ്രഹിക്കുന്നത് ?",
      name: "bussinessType",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label: "ഏത് പ്രോബ്ലം ആണ് പരിഹരിക്കുവാന്‍ താൽപര്യപ്പെടുന്നത് ?",
      name: "problemSolve",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label: "എങ്ങനെയാണ് ആ പ്രോബ്ലം പരിഹരിക്കുവാന്‍ പ്ലാൻ ചെയ്യുന്നത് ?",
      name: "planToSolve",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label: "ഈ പരിഹരിക്കുവാന്‍ എങ്ങനെയാകും വരുമാനം ഉണ്ടാക്കുക ?",
      name: "howToSolve",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label:
        "എന്താണ് നിങ്ങളുടെ സംരംഭം വിജയിക്കുമെന്ന് വിശ്വസിക്കാനുള്ള കാരണം ?",
      name: "howToSuccess",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label: "ആരായിരിക്കും നിങ്ങളുടെ കസ്റ്റമേഴ്സ് ?",
      name: "typeOfCustomer",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label:
        "എങ്ങനെയാണ് നിങ്ങളുടെ ഉല്പന്നം/സേവനം മാർക്കറ്റ് & സെയിൽസ് ചെയ്യുവാൻ പ്ലാൻ ചെയ്യുന്നത് ?",
      name: "planToMarketing",
      type: "textarea",
      placeholder: "",
      required: false,
    },
    {
      label: "സംരംഭം വിജയിപ്പിക്കുവാൻ എന്ത് സപ്പോർട്ട് ആണ് നിങ്ങൾക് വേണ്ടത് ?",
      name: "typeOfSupport",
      type: "textarea",
      placeholder: "",
      required: false,
    },
  ];

  const options = [
    { label: " Events/Functions", value: "Events" },
    { label: "Inaguration", value: "Inaguration" },
    { label: "ProgramRegister", value: "ProgramRegister" },
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
    resolver: yupResolver(ProgramRegisterschema),
    defaultValues: defaultValue || {},
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <Row className="mb-8 d-flex justify-content-center align-items-center  ">
      <Col xl={10} lg={10} md={12} xs={12}>
        <Card>
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Register Program</h4>
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
                {/* programregister type  */}
                {/* 
                <Row className="mb-3">
                  <label
                    htmlFor={name}
                    className="col-sm-4 col-form-label form-label"
                  >
                    Select ProgramRegister Type
                  </label>
                  <Col md={8} xs={12}>
                    <Form.Select
                      name="programregisterType"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select ProgramRegister Type</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row> */}

                {/*End programregister type  */}

                {/* <Row className="mb-3">
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
                </Row> */}
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
