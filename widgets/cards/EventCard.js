import { getAllEvents } from "components/api/admin/events/route";
import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import Slider from "react-slick";

function EventCard() {
  const [eventItems, setEventsItems] = useState([]);

  const getEvents = async () => {
    const res = await getAllEvents();
    setEventsItems(res);
  };

  useEffect(() => {
    getEvents();
  }, []);

  let settings = {
    arrows: false,
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    initialSlide: 0,
    accessibility: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings} className="w-100 ">
        {eventItems?.map((item) => (
          <div key={item.id} className="w-100 d-flex gap-3">
            <Card className="mx-3">
              <Card.Img
                variant="top"
                src={item?.image}
                alt={item?.title}
                style={{ height: "18rem" }}
                className="img-fluid w-100 h-48 md:h-64 aspect-square"
              />
              <Card.Body>
                <Card.Text>{item?.title}</Card.Text>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default EventCard;

{
  /* <Card className=" h-100 bg-danger">
<Card className="h-100 p-4" style={{ height: "280px" }}>
  <Image
    className="d-block w-100 h-100 object-fit-fill"
    src={item?.image}
    alt={item?.title}
  />
</Card>
<Card.Body className="d-flex flex-column justify-content-between align-items-center">
  <h3 className="mb-3">Title</h3>
  <p className="mb-0" style={{ textAlign: "justify" }}>
    International film festival with favorite films and classic
    visual experiences of film lovers traveling with the movements
    of world cinema.
  </p>
</Card.Body>
</Card> */
}
