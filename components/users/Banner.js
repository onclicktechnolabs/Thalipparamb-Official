import React from "react";
import { Carousel, Image } from "react-bootstrap";

function Banner({bannerItems}) {

  return (
    <Carousel indicators={false} className="mt-2 mb-6">
      {bannerItems?.map((item) => (
        <Carousel.Item className="carousel-item" key={item?.id}>
          <Image
            className="d-block w-100  h-100 object-fit-fill"
            src={item?.image}
            alt={item?.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Banner;
