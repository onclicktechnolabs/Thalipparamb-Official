import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropFiles } from "widgets";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  createGreetings,
  uploadGreetingsImages,
} from "components/api/admin/greetings/route";

function UploadGreetings() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("/api/auth/signin?callbackUrl=/greetinss");
  //   },
  // });

  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [GreetingType, setGreetingType] = useState("");

  const [fileError, setFileError] = useState("");
  const [typeError, setTypeError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFileError("");
    setTypeError("");

    if (!GreetingType) {
      setTypeError("Greeting Type is required");
    }

    if (files.length === 0) {
      setFileError("Please select an image file");
    } else {
      try {
        const val = files[0].type.split("/");
        const extention = val[1];

        const resImage = await uploadGreetingsImages(files[0]);
        const formData = {
          greetingType: GreetingType,
          file: resImage,
          fileType: extention,
        };
        const res = await createGreetings(formData);
        router.push("/admin/complaints/greetings");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="mt-6">
      <Row className="mb-8 d-flex justify-content-center align-items-center  ">
        <Col xl={10} lg={10} md={12} xs={12}>
          <Card>
            <Card.Body>
              <div className=" mb-6">
                <h4 className="mb-1">Upload Greetings</h4>
              </div>
              <div>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="mb-3">
                    <label
                      htmlFor="Greetings"
                      className="col-sm-4 col-form-label form-label"
                    >
                      Greetings Type
                    </label>
                    <Col md={8} xs={12}>
                      <input
                        type="text"
                        className="form-control"
                        id="Greetings"
                        name="Greetings"
                        placeholder="Enter Greetings type"
                        value={GreetingType}
                        onChange={(e) => setGreetingType(e.target.value)}
                      />
                      {typeError && (
                        <Col md={8} xs={12}>
                          <span className="col-sm-4 col-form-label form-label text-danger">
                            {typeError}
                          </span>
                        </Col>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-sm-4 col-form-label form-label"
                    >
                      Upload
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
    </div>
  );
}

export default UploadGreetings;
