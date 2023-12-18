import GeneralForm from "sub-components/generalForm";

function AddComplaints() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/complaints");
    },
  });


  const router = useRouter();
  const defaultValues = {
    title: "",
    phone: "",
    address: "",
    description: "",
    panchayath: "",
  };
  const onSubmit = async (formData) => {
    const resImage = await uploadComplaintImages(formData.files[0]);
    if (session?.user?.role === "admin") {
      const res = await createComplaint({
        title: formData.title,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        panchayath: formData.panchayath,
        createdBy: session?.user?.email,
        type: formData.type,
        priority: "low",
        status: "new",
        image: resImage,
      });
      router.push("/admin/complaints/all");
    }
    // if (session?.user?.role === "User") {
    //   const res = await createComplaint({
    //     title: formData.title,
    //     phone: formData.phone,
    //     address: formData.address,
    //     description: formData.description,
    //     panchayath: formData.panchayath,
    //     createdBy: session?.user?.email,
    //     type: "complaint",
    //     image: resImage,
    //   });
    //   router.push("/");
    // }
  };
  return (
    <div className="mt-6">
      <GeneralForm />
    </div>
  );
}

export default AddComplaints;
