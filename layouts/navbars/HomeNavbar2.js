import { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useMediaQuery } from "react-responsive";
import { useSession, signIn, signOut } from "next-auth/react";

function HomeNavbar2() {
  const { t } = useTranslation("Navbar");

  const { data: session, status } = useSession();
  const [language, setLanguage] = useState("ml");

  const toggleLanguage = () => {
    const newValue = language === "en" ? "ml" : "en";
    setLanguage(newValue);
  };


  const isMobile = useMediaQuery({ maxWidth: 615 });
  return (
    <Navbar
      expand="lg"
      className="sticky-top bg-white box-shadow border-bottom"
    >
      <Container fluid className="px-5 ">
        {/* <Row className="align-items-center"> */}
          {/* Logo and Menu for Small Screens */}
          {/* <Col xs={6} md={4}> */}
            <Navbar.Brand href="#" className="d-flex align-items-center ">
              {/* <figure className="m-0 w-full"> */}
                {isMobile ? (
                  <Image
                    src="/thalipparamb/apple-touch-icon.png"
                    alt="Thalipparamb"
                    className="img-fluid w-25 h-25"
                  />
                ) : (
                  <Image
                    src="/thalipparamb/logo-Thaliparamba-ml (1).png"
                    alt="Thalipparamb"
                    className="img-fluid w-50 h-75"
                  />
                )}
              {/* </figure> */}
            </Navbar.Brand>
          {/* </Col> */}

          {/* Navbar Toggle for Small Screens */}
          {/* <Col xs={6} className="d-flex justify-content-end align-items-end"> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* </Col> */}

          {/* Menus and Buttons for Medium Screens and Above */}
          {/* <Col xs={12} md={8} className="d-flex justify-content-between align-items-end"> */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#tourism">Tourism</Nav.Link>
                <Nav.Link href="#gallery">Gallery</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse id="basic-navbar-nav" className="ms-2">
              <Nav className="mr-auto">
                <Nav.Link>
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={toggleLanguage}
                  >
                    {language === "ml" ? "Malayalam" : "English"}
                  </button>
                </Nav.Link>
                {session ? (
                  <Nav.Link>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>{" "}
                  </Nav.Link>
                ) : (
                  <Nav.Link>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => signIn("google")}
                    >
                      Login
                    </button>{" "}
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </Navbar>
  );
}

export default HomeNavbar2;
