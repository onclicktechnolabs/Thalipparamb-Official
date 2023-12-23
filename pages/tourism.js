import HomeLayout from "layouts/HomeLayout";
import React from "react";

function tourism() {
  return (
    <div className=" h-100 w-100 d-flex flex-column">
      <div className="flex-grow-1"></div>
      <div className="text-center">
        <h2 className="happiness fw-bold ls-sm">Tourism</h2>
        <p>Comming soon..</p>
      </div>
      <div className="flex-grow-1"></div>
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
