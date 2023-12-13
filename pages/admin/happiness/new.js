import React from "react";
import EventForm from "components/admin/EventForm";
import HappinessForm from "components/admin/HappinessForm";
import BannerForm from "components/admin/banner/BannerForm";
import {
  createHappiness,
  uploadHappinessImages,
} from "components/api/admin/happiness/route";

import { useRouter } from "next/navigation";

function AddHappiness() {
  const router = useRouter();
  const defaultValues = {
    title: "",
    description: "",
  };
  const onSubmit = async (formData) => {
    console.log("🚀 ~ file: new.js:18 ~ onSubmit ~ formData:", formData);
    const resImage = await uploadHappinessImages(formData.files[0]);
    const res = await createHappiness({
      title: formData.title,
      description: formData.description,
      image: resImage,
    });
    router.push("/admin/happiness/all");
  };
  return (
    <div className="mt-6">
      <HappinessForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

export default AddHappiness;
