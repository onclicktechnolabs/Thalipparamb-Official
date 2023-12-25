import React from "react";
import HomeLayout from "layouts/HomeLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerProgram } from "components/api/user/route";
import ProgramRegisterForm from "components/users/ProgramRegisterForm";

function Register() {
  const router = useRouter();
  const defaultValues = {
    name: "",
    phone: "",
    program: "",
    date: "",
    token: ""
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
      <ProgramRegisterForm onSubmit={onSubmit} defaultValue={defaultValues} />
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
