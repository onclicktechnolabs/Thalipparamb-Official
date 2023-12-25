import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";

function EventCard({ events }) {
  const { locale } = useRouter();

  const t = useTranslations("common");

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
        {events?.map((item) => (
          <div key={item.id} className="w-100 d-flex px-3">
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
                  <Card.Text className=" mb-sm-0"> {locale === 'ml' ? item?.title_ml : item?.title_en}
                  </Card.Text>
                  <Card.Text>{t("venue")}: {item?.venue}</Card.Text>
                </div>
                <Card.Text style={{ textAlign: 'justify' }}>
                  {locale === 'ml' ? item?.description_ml : item?.description_en}
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


