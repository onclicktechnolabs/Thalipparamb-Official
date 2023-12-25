import HomeLayout from "layouts/HomeLayout";
import React from "react";

function tourism() {
  return (
    <div className="h-100 w-100 d-flex flex-column" >
      <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh", width: "100vw" }}>
        <h2 className="happiness fw-bold ls-sm">Tourism</h2>
        <p>Coming soon..</p>
      </div>
    </div>

  );
}

tourism.Layout = HomeLayout;
export default tourism;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
    },
  };
}
