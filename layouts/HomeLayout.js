import React from "react";
// import HomeNavbar from "layouts/navbars/HomeNavbar";
import HomeFooter from "pages/components/footer";
import HomeNavbar2 from "./navbars/HomeNavbar2";
function HomeLayout({ children }) {
  return (
    <>
      <HomeNavbar2 />
      {children}
      <HomeFooter />
    </>
  );
}

export default HomeLayout;
