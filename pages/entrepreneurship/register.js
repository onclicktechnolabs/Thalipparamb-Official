import React from "react";
import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {  registerProgram } from "components/api/user/route";
import EntrepreneurshipForm from "components/users/EntrepreneurshipForm";

function Register() {
  const router = useRouter();
  const defaultValues = {
    name: "",
    phone: "",
    panchayath: "",
    ward: "",
    bussinessType: "",
    problemSolve: "",
    planToSolve: "",
    howToSolve: "",
    howToSuccess: "",
    typeOfCustomer: "",
    planToMarketing: "",
    typeOfSupport: "",
  };
  const onSubmit = async (formData) => {
    const res = await registerProgram(formData);
    if (res.success == "ok") {
      toast.success("Registration successfully submitted");
      router.push("/");
    }
  };
  return (
    <div className="d-flex justify-content-center mt-6 ">
      <EntrepreneurshipForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

Register.Layout = HomeLayout;

export default Register;
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
