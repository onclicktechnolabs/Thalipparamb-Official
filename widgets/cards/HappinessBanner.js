import React from "react";
import { Card, Carousel, Col, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";

function HappinessBanner({ happinessItems }) {
    const router = useRouter();
    const { locale } = router;

    let settings = {
        arrows: false,
        dots: false,
        infinite: true,
        lazyLoad: true,
        slidesToShow: 3,
        slidesToScroll: 3,
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
            {happinessItems?.map((item) => (
                <div key={item.id} className="  w-100 d-flex px-3">
                    <Card className="w-100 ">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={item?.image}
                                className="d-block w-100 h-100 object-fit-fill"
                                alt="Card Image"
                            />
                        </Card>
                        {/* <Card.Body className="w-full ">
                            <h3 className="text-center fs-4 fw-medium text-dark">
                                {item?.[`title_${locale}`]}
                            </h3>
                        </Card.Body> */}
                    </Card>
                </div>
            ))}
        </Slider>
        // <Col className="w-100 d-flex mb-3 ">
        //   {happinessItems?.map((item) => (
        //     <Card
        //       xl={12}
        //       lg={12}
        //       md={12}
        //       xs={12}
        //       style={{ width: "100%" }}
        //       className=" "
        //     >
        //       <Card.Img
        //         variant="top"
        //         className="d-block w-100  h-48 md:h-64 aspect-square img-fluid"
        //         style={{ objectFit: "fill", height: "100%" }}
        //         src={item?.image}
        //         alt={item?.title}
        //       />
        //       <Card.Body>
        //         <Card.Title> {item?.title}</Card.Title>
        //         <Card.Text>
        //           Some quick example text to build on the card title and make up the
        //           bulk of the card's content.
        //         </Card.Text>
        //       </Card.Body>
        //     </Card>
        //   ))}
        // </Col>
    );
}

export default HappinessBanner;
