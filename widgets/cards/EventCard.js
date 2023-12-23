import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";

function EventCard({events}) {

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
      <Slider {...settings} className="w-100  ">
        {events?.map((item) => (
          <div key={item.id} className="px-3 w-100 d-flex ">
            <Card className="">
              <Card.Img
                variant="top"
                src={item?.image}
                alt={item?.title}
                style={{ height: "18rem" }}
                className="img-fluid w-100 h-48 md:h-64 aspect-square shadow"
              />
              <Card.Body className="px-4">
                <div className="w-100 d-flex flex-column flex-sm-row justify-content-between fw-bold text-center py-2">
                  <Card.Text className=" mb-sm-0">{item?.title}</Card.Text>
                  <Card.Text>Venue: {item?.place}</Card.Text>
                </div>

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


