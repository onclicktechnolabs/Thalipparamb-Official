import React from "react";
import { Card, Image } from "react-bootstrap";

function EventCard({ item }) {
  return (
    <Card className=" h-100">
      <Card className="h-100">
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src={item?.image}
          alt={item?.title}
        />
      </Card>
      {/* <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <h3 className="mb-3">Title</h3>
        <p className="mb-0" style={{ textAlign: "justify" }}>
          International film festival with favorite films and classic visual
          experiences of film lovers traveling with the movements of world
          cinema.
        </p>
      </Card.Body> */}
    </Card>
  );
}

export default EventCard;
