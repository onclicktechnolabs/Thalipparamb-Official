import { Card, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function GalleryCard({ locale, galleryItems }) {

  let settings = {
    arrows: false,
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <Slider {...settings} className="w-100  ">
      {galleryItems?.map((item) => (
        <div key={item.id} className="px-3  w-100 d-flex">
          <Card className="w-100 ">
            <Image
              src={item?.image}
              alt={item?.title_en}
              className="img-fluid w-100 h-48 md:h-64 aspect-square"
            />
            <Card.Body className="w-full ">
              <h3 className="text-center fs-4 fw-medium text-dark ">
                {item?.[`title_${locale}`]}
              </h3>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Slider>
  );
}

export default GalleryCard;
