import { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Container, Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useMediaQuery } from "react-responsive";
import { useSession, signIn, signOut } from "next-auth/react";

function HomeNavbar2() {
  const { t } = useTranslation("Navbar");
  console.log("🚀 ~ file: HomeNavbar2.js:12 ~ HomeNavbar2 ~ t:", t);

  const { data: session, status } = useSession();
  console.log("🚀 ~ file: HomeNavbar2.js:11 ~ HomeNavbar2 ~ status:", status);
  console.log("🚀 ~ file: HomeNavbar2.js:11 ~ HomeNavbar2 ~ session:", session);
  const [language, setLanguage] = useState("ml");

  const toggleLanguage = () => {
    const newValue = language === "en" ? "ml" : "en";
    setLanguage(newValue);
  };

  // const handleSignIn = async () => {
  //   console.log("Login clicked");
  //   signIn("google");
  // };
  const isMobile = useMediaQuery({ maxWidth: 615 });
  return (
    <Navbar
      expand="lg"
      className="sticky-top bg-white box-shadow border-bottom"
    >
      <Container fluid className="px-5">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <figure className="m-0">
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
                className="img-fluid w-50 h-50"
              />
            )}
          </figure>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="ms-2">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home </Nav.Link>
            {/* {t("home")} */}

            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">Tourism</Nav.Link>
            <Nav.Link href="#link">Gallery</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link md={12} xs={12} className="">
              <button
                md={12}
                xs={12}
                className="btn btn-outline-secondary w-100" // Added w-100 class here
                onClick={toggleLanguage}
              >
                {language === "ml" ? "Malayalam" : "English"}
              </button>
            </Nav.Link>
            {session ? (
              <Nav.Link md={12} xs={12}>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => signOut()}
                >
                  Logout
                </button>{" "}
                {/* Added w-100 class here */}
              </Nav.Link>
            ) : (
              <Nav.Link md={12} xs={12} href="api/auth/signin">
                <button
                  className="btn btn-outline-primary w-100"
                  // onClick={() => signIn("google")}
                >
                  Login
                </button>{" "}
                {/* Added w-100 class here */}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar2;
