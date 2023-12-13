import BannerForm from "components/admin/banner/BannerForm";
import { createBanner, uploadImages } from "components/api/admin/banner/route";
import { useRouter } from "next/navigation";
import React from "react";
import GeneralForm from "sub-components/generalForm";

function NewBanner() {
  const router = useRouter();
  const defaultValues = {
    title: "",
    description: "",
    scheduleDate: "",
  };
  const onSubmit = async (formData) => {
    console.log("submitted", formData);
    const resImage = await uploadImages(formData.files[0]);
    console.log("🚀 ~ file: new.js:15 ~ onSubmit ~ resImage:", resImage);
    const res = await createBanner({
      title: formData.title,
      description: formData.description,
      scheduleDate: formData.scheduleDate,
      image: resImage,
    });
    router.push("/admin/banner/all");
  };

  return (
    <div className="mt-6">
      <BannerForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

export default NewBanner;
