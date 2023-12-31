import React from "react";
import HomeLayout from "layouts/HomeLayout";
import ComplaintForm from "components/admin/ComplaintForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  createComplaint,
  uploadComplaintImages,
} from "components/api/admin/complaint/route";

function Complaints() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/complaints");
    },
  });

  // console.log("🚀 ~ file: index.js:14 ~ Complaints ~ session:", session);

  const router = useRouter();
  const defaultValues = {
    title: "",
    phone: "",
    address: "",
    panchayath: "",
    ward: "",
    subject: "",
    description: "",
  };
  const onSubmit = async (formData) => {
    const resImage = await uploadComplaintImages(formData.files[0]);
    if (session?.user?.role === "admin") {
      const res = await createComplaint({
        title: formData.title,
        phone: formData.phone,
        address: formData.address,
        panchayath: formData.panchayath,
        createdBy: session?.user?.email,
        ward: formData.ward,
        subject: formData.subject,
        description: formData.description,
        priority: "low",
        status: "created",
        type: formData.type,
        image: resImage,
      });
      console.log("🚀 ~ file: index.js:45 ~ onSubmit ~ res:", res);
      if (res) {
        toast.success("Registration successful");
      }

      router.push("/admin/complaints/all");
    }
    if (session?.user?.role === "User") {
      const res = await createComplaint({
        title: formData.title,
        phone: formData.phone,
        address: formData.address,
        ward: formData.ward,
        subject: formData.subject,
        panchayath: formData.panchayath,
        description: formData.description,
        createdBy: session?.user?.email,
        priority: "low",
        status: "created",
        type: "complaint",
        image: resImage,
      });
      if (res) {
        toast.success("Registration successful");
      }
      router.push("/");
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
