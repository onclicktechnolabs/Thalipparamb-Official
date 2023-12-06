import React from "react";
import HomeNavbar from "layouts/navbars/HomeNavbar";
import HomeFooter from "pages/components/footer";
function HomeLayout({ children }) {
  return (
    <>
      <HomeNavbar />
      {children}
      <HomeFooter />
    </>
  );
}

export default HomeLayout;
