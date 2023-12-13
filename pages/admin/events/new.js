import EventForm from "components/admin/EventForm";
import BannerForm from "components/admin/banner/BannerForm";
import {
  createEvent,
  uploadEventImages,
} from "components/api/admin/events/route";
import { useRouter } from "next/navigation";
import React from "react";

function NewEvents() {
  const router = useRouter();
  const defaultValues = {
    title: "",
    place: "",
    scheduleDate: "",
    status: "",
  };
  const onSubmit = async (formData) => {
    const resImage = await uploadEventImages(formData.files[0]);
    const res = await createEvent({
      title: formData.title,
      place: formData.place,
      scheduleDate: formData.date,
      status: formData.status,

      image: resImage,
    });
    router.push("/admin/events/all");
  };
  return (
    <div className="mt-6">
      <EventForm onSubmit={onSubmit} defaultValue={defaultValues} />
    </div>
  );
}

export default NewEvents;
