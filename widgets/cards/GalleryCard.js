import { Card, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function GalleryCard() {
  const imageGallery = [
    {
      categoryTitle: "KIDS",
      categoryLink: "/",
    },
    {
      categoryTitle: "WOMEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
    {
      categoryTitle: "MEN",
      categoryLink: "/",
    },
  ];

  let settings = {
    dots: false,
    infinite: true,
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
    <Slider {...settings} className="d-flex  w-100 ">
      {imageGallery?.map((item, index) => (
        <div className="px-3">
          <Card key={index}>
            <Card>
              <Image
                src="https://plus.unsplash.com/premium_photo-1667354155834-eb14918fb4a3?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="image"
                className="img-fluid w-100 h-48 md:h-64 aspect-square"
              />
            </Card>
            <Card.Body>
              <h3 className="text-lg font-weight-medium text-dark text">
                {item?.categoryTitle}
              </h3>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Slider>
  );
}

export default GalleryCard;
