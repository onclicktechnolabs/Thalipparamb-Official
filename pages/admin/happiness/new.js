import React from "react";
import HappinessForm from "components/admin/HappinessForm";
import {
  createHappiness,
  uploadHappinessImages,
} from "components/api/admin/happiness/route";

import { useRouter } from "next/navigation";

function AddHappiness() {
  const router = useRouter();
  const defaultValues = {
    title_en: "",
    title_ml: "",
    description_en: "",
    description_ml: "",
    active: true
  };

  const onSubmit = async (formData) => {
    const resImage = await uploadHappinessImages(formData.files[0]);
    const res = await createHappiness({
      title_en: formData.title_en,
      title_ml: formData.title_ml,
      description_en: formData.description_en,
      description_ml: formData.description_ml,
      active: true,
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
