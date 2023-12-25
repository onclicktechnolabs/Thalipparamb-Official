import { Container, Image, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useMediaQuery } from "react-responsive";
import { useSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "components/LocaleSwitcher";
import ProfileMenu from "layouts/ProfileMenu";

function HomeNavbar2() {
  const t = useTranslations("common");

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
        <Navbar.Brand href="/" className=" w-25  ">
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
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav  " />
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
                href="/entrepreneurship"
                className="fw-bold"
              >
                {t("entrepreneurship")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/happiness-festival" className="fw-bold">
                {t("festival")}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#gallery" className="fw-bold">
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

            {session ? (
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
      </Container>
    </Navbar>
  );
}

export default HomeNavbar2;
