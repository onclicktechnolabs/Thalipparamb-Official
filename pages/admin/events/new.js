import EventForm from "components/admin/EventForm";
import {
  createEvent,
  uploadEventImages,
} from "components/api/admin/events/route";
import { useRouter } from "next/navigation";
import React from "react";

function NewEvents() {
  const router = useRouter();
  const defaultValues = {
    title_en: "",
    title_ml: "",
    description_en: "",
    description_ml: "",
    venue: "",
    // start_date: '2023-10-27T09:31:18.000Z',
    start_date: "",
    end_date: "",
    status: "",
  };
  const onSubmit = async (formData) => {
    const resImage = await uploadEventImages(formData.files[0]);
    const res = await createEvent({
      title_en: formData.title_en,
      title_ml: formData.title_ml,
      description_en: formData.description_en,
      description_ml: formData.description_ml,
      venue: formData.venue,
      start_date: formData.start_date,
      // start_date: JSON.stringify(formData.start_date),
      end_date: formData.end_date,
      // end_date: JSON.stringify(formData.end_date),
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
