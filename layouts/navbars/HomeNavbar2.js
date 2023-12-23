import { Col, Container, Image, NavDropdown, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useMediaQuery } from "react-responsive";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "components/LocaleSwitcher";
import ProfileMenu from "layouts/ProfileMenu";

function HomeNavbar2() {
  const t = useTranslations("Navbar");
  const tp = useTranslations("projects");

  const { data: session, status } = useSession();

  const isMobile = useMediaQuery({ maxWidth: 615 });

  return (
    <Navbar
      expand="lg"
      className="sticky-top bg-white box-shadow border-bottom"
    >
      <Container
        fluid
        className="px-5 d-flex justify-content-between align-items-center "
      >
        {/* <Row className="align-items-center"> */}
        {/* Logo and Menu for Small Screens */}
        {/* <Col xs={6} md={4}> */}
        <Navbar.Brand href="/" className=" w-25  ">
          {/* <figure className="m-0 w-full"> */}
          {isMobile ? (
            <Image
              src="/thalipparamb/apple-touch-icon.png"
              alt="Thalipparamb"
              className="img-fluid w-100 h-50"
            />
          ) : (
            <Image
              src="/thalipparamb/logo-Thaliparamba-ml (1).png"
              alt="Thalipparamb"
              className="img-fluid w-100 h-100"
            />
          )}
          {/* </figure> */}
        </Navbar.Brand>
        {/* </Col> */}

        {/* Navbar Toggle for Small Screens */}
        {/* <Col xs={6} className="d-flex justify-content-end align-items-end"> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav  " />
        {/* </Col> */}

        {/* Menus and Buttons for Medium Screens and Above */}
        {/* <Col xs={12} md={8} className="d-flex justify-content-between align-items-end"> */}
        <Navbar.Collapse id="basic-navbar-nav" className=" ms-2">
          <Nav className="mx-auto">
            <Nav.Link href="/" className="fw-bold">
              {t("home")}{" "}
            </Nav.Link>
            <Nav.Link href="/about" className="fw-bold">
              {t("about")}
            </Nav.Link>
            <Nav.Link href="/tourism" className="fw-bold">
              {t("tourism")}
            </Nav.Link>
            <NavDropdown
              title={t("projects")}
              id="basic-nav-dropdown"
              className="fw-bold"
            >
              <NavDropdown.Item
                href="/entrepreneurship-program"
                className="fw-bold"
              >
                {tp("entrepreneur-ship")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/happiness-festival" className="fw-bold">
                {tp("festival")}
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/#gallery" className="fw-bold">
              {t("gallery")}
            </Nav.Link>
            <Nav.Link href="complaints" className="fw-bold">
              {t("complaints")}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="ms-2 d-lg-flex justify-content-lg-end  "
        >
          <Nav className="mr-auto">
            <LocaleSwitcher />
            {/* <Nav.Link>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={toggleLanguage}
              >
                {language === "ml" ? "Malayalam" : "English"}
              </button>
            </Nav.Link> */}
            {session ? (
              // <Nav.Link>
              //   <button
              //     className="btn btn-outline-primary w-100"
              //     onClick={() => signOut()}
              //   >
              //     Logout
              //   </button>{" "}
              // </Nav.Link>
              <Nav.Link>
                <ProfileMenu data={session} />
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
