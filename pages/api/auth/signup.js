import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

import AuthLayout from "layouts/AuthLayout";
import { signIn } from "next-auth/react";

const SignUp = () => {
  // Step 1: Create a single state object for form data

  const email = e.target.email.value;
  const password = e.target.password.value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      // const apiRes = await axios.post(
      //   "http://localhost:3000/api/auth/user",
      //   formData
      // );

      // if (apiRes?.data?.success) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(
        "🚀 ~ file: register.js:44 ~ handleSubmit ~ loginRes:",
        loginRes
      );

      // } else {
      //   console.log("User registration failed. Server response:", apiRes?.data);
      // }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-5 gap-2">
              <div className="d-flex justify-content-center align-items-center">
                <Link href="/">
                  <Image
                    src="/thalipparamb/logo-Thaliparamba-ml (1).png"
                    alt="Thalipparamb"
                    className="img-fluid w-100 h-100"
                  />
                </Link>
              </div>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            <Form onSubmit={handleSubmit}>
              {/* <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="User Name"
                  required=""
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  required=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="**************"
                  required=""
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Group> */}
              <div>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="api/auth/login" className="fs-5">
                      Already a member? Login
                    </Link>
                  </div>
                  <div></div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
