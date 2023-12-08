import { useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

import AuthLayout from "layouts/AuthLayout";
import { signIn } from "next-auth/react";

const SignIn = () => {
  // Step 2: Create state variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Step 3: Attach onChange event handlers to update the state
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (loginRes) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {}
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
                  name="username"
                  placeholder="Enter address here"
                  required=""
                  value={username}
                  onChange={handleUsernameChange}
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
                  value={password}
                  onChange={handlePasswordChange}
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
                    <Link href="/authentication/register" className="fs-5">
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
