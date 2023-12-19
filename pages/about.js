import HomeLayout from "layouts/HomeLayout";
import React from "react";

function About() {
  return (
    <div className="h-100 w-100 d-flex flex-column">
      <div className="flex-grow-1"></div>
      <div className="text-center">
        <h2 className="happiness fw-bold ls-sm">About Us</h2>
      </div>
      <div className="flex-grow-1"></div>
    </div>
  );
}

About.Layout = HomeLayout;
export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
    },
  };
}
