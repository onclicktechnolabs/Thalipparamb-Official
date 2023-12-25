import ComplaintForm from "components/admin/ComplaintForm";
import {
  createComplaint,
  uploadComplaintImages,
} from "components/api/admin/complaint/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AddComplaints() {
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
        type: formData.type,
        priority: "low",
        status: "new",
        image: resImage,
      });
      router.push("/admin/complaints/all");
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

export default AddComplaints;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../locales/en.json`)).default,
    },
  };
}
