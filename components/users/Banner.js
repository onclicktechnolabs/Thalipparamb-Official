import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageUrl from "../../public/thalipparamb/book_fare.jpg";

const carouselItems = [
  {
    id: "1",
    image: imageUrl,
    itemNo: "1",
    title: "First Banner",
    description: "First banner description",
  },
  {
    id: "2",
    image: imageUrl,
    itemNo: "2",
    title: "Second Banner",
    description: "Second banner description",
  },
  {
    id: "3",
    image: imageUrl,
    itemNo: "3",
    title: "Third Banner",
    description: "Third banner description",
  },
  {
    id: "4",
    image: imageUrl,
    itemNo: "4",
    title: "Fourth Banner",
    description: "Fourth banner description",
  },
  {
    id: "5",
    image: imageUrl,
    itemNo: "5",
    title: "Fifth Banner",
    description: "Fifth banner description",
  },
];
function Banner() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    cssEase: "linear",
    swipeToSlide: true,
    // autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings} className="w-100 d-flex bg-cover bg-center ">
      {carouselItems &&
        carouselItems.map((item) => (
          <div
            key={item.id}
            className="w-100 d-flex flex-column justify-content-between p-4 h-auto h-md-100"
          >
            <div className="carousel-item">
              <img
                src={item?.image.toString()}
                alt={item.title}
                className="w-auto img-fluid object-cover h-48 h-md-100"
              />
            </div>
            <div className="d-flex flex-column justify-content-start w-100 p-2">
              <h1 className="fw-bold text-md md-text-4xl">{item.title}</h1>
              <span className="d-block text-slate-600">
                {item?.description}
              </span>
            </div>
          </div>
        ))}
    </Slider>
  );
}

export default Banner;
