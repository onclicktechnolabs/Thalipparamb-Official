import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { signIn } from "next-auth/react";

import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("Login Response:", loginRes);

      if (loginRes?.ok) {
        // Navigate to the home page or handle success as needed
      } else {
        console.error("Error during sign-in:", loginRes?.error);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
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
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username or email</Form.Label>
                {/* Step 3: Attach onChange event handler */}
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter address here"
                  required=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                {/* Step 3: Attach onChange event handler */}
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>
              <div>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/api/auth/register" className="fs-5">
                      Create An Account
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

SignIn.Layout = AuthLayout;

export default SignIn;
