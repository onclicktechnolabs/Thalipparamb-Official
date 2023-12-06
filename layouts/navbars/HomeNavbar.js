import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

function HomeNavbar() {
  const [language, setLanguage] = useState("ml");
  const toggleLanguage = () => {
    const newValue = language === "en" ? "ml" : "en";
    setLanguage(newValue);
  };

  return (
    <header>
      <nav class="fixed-top navbar navbar-expand-lg bg-white box-shadow p-3 px-md-4 mb-3 border-bottom ">
        <div class="container-fluid  ">
          {/* <a class="navbar-brand" href="/">
            Company Name
          </a> */}
          <Link
            href={"/"}
            className="flex items-center cursor-pointer w-full md:w-auto  "
          >
            <figure className="w-full md:w-auto">
              <Image
                src="/thalipparamb/logo-Thaliparamba-ml (1).png"
                alt="Thalipparamb"
                className="img-fluid w-50 h-50"
              />
            </figure>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/lazy">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Tourism
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Gallery
                </a>
              </li>
              <li class="nav-item px-2">
                <button
                  class="btn btn-outline-secondary"
                  onClick={toggleLanguage}
                >
                  {language === "ml" ? "Malayalam" : "English"}
                </button>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-primary">Sign Up</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
