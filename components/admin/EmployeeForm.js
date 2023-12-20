import { Col, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AutoFormField from "sub-components/generalForm/AutoFormField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Employeschema = Yup.object().shape({
  // photo: Yup.string().required("Photo is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  sectionRole: Yup.string().required("Section Role is required"),
});

function EmployeForm({ onSubmit, defaultValue }) {
  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Name title",
      required: false,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      required: false,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      placeholder: "Enter Phone Number",
      required: false,
    },
    {
      label: "Section Role",
      name: "sectionRole",
      type: "select",
      placeholder: "Select Role",
      required: false,
      options: [
        { label: " Events", value: "Events" },
        { label: " Happiness", value: "Happiness" },
        { label: " Tourism", value: "Tourism" },
        { label: " Wellness", value: "Wellness" },
      ],
    },
  ];

  // const [files, setFiles] = useState([]);
  // const [fileError, setFileError] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Employeschema),
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
              <h4 className="mb-1">New Employes</h4>
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

export default EmployeForm;
