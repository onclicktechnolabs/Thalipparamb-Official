import React from "react";

import GalleryForm from "components/admin/GalleryForm";
import { useRouter } from "next/navigation";
import {
  createGallery,
  uploadGalleryImages,
} from "components/api/admin/gallery/route";

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
      <GalleryForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

export default AddGallery;
