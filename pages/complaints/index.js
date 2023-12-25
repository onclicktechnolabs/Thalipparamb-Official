import React from "react";
import HomeLayout from "layouts/HomeLayout";
import ComplaintForm from "components/admin/ComplaintForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {
  createComplaint,
  uploadComplaintImages,
} from "components/api/admin/complaint/route";
import { toast } from "react-toastify";

function Complaints() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/complaints");
    },
  });

  const router = useRouter();
  const defaultValues = {
    name: "",
    phone: "",
    address: "",
    locality: "",
    ward: "",
    subject: "",
    description: "",
  };

  const onSubmit = async (formData) => {
    alert("reached")
    const resImage = await uploadComplaintImages(formData.files[0]);
    if (session?.user?.role === "admin") {
      const res = await createComplaint({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        ward: formData.ward,
        locality: formData.locality,
        subject: formData.subject,
        description: formData.description,

        createdBy: session?.user?.email,
        priority: "low",
        status: "created",
        type: formData.type,
        image: resImage,
      });
      // if (res.status === "ok") {
      //   toast.success("Registration successful");
      //   router.push("/admin/complaints/all");
      // } else {
      //   toast.error("Registration failed, Try again!");
      // }
    }
    if (session?.user?.role === "User") {
      const res = await createComplaint({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        locality: formData.locality,
        ward: formData.ward,
        subject: formData.subject,
        description: formData.description,
        createdBy: session?.user?.email,
        priority: "low",
        status: "created",
        type: "complaint",
        image: resImage,
      });
      if (res.status === "ok") {
        toast.success("Registration successfully submitted");
        router.push("/");
      } else {
        toast.error("Registration Failed, Try again");
      }
    }
  };
  return (
    <div className="mt-6">
      <ComplaintForm
        onSubmit={onSubmit}
        defaultValue={defaultValues}
        loginData={session?.user}
      />
    </div>
  );
}

Complaints.Layout = HomeLayout;
export default Complaints;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
