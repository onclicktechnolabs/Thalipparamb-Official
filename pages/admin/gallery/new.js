import React from "react";
import GeneralForm from "sub-components/generalForm";

function AddGallery() {
  const router = useRouter();
  const defaultValues = {
    title: "",
  };
  const onSubmit = async (formData) => {
    const resImage = await uploadGalleryImages(formData.files[0]);
    const res = await createGallery({
      title: formData.title,
      image: resImage,
    });
    router.push("/admin/gallery/all");
  };

  return (
    <div className="mt-6">
      <GeneralForm />
    </div>
  );
}

export default AddGallery;
