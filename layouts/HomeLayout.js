import React from "react";
import HomeFooter from "pages/components/footer";
import HomeNavbar2 from "./navbars/HomeNavbar2";

function HomeLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HomeNavbar2 />
      {children}
      <HomeFooter />
    </div>
  );
}

export default HomeLayout;
