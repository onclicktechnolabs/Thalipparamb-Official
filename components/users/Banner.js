import { getAllBanner } from "components/api/admin/banner/route";
import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";

function Banner() {
  const [bannerItems, setBannerItems] = useState([]);

  useEffect(() => {
    const getbaner = async () => {
      const res = await getAllBanner();
      setBannerItems(res);
    };
    getbaner();
  }, []);

  return (
    <Carousel indicators={false} className="mt-2">
      {bannerItems?.map((item) => (
        <Carousel.Item className="carousel-item" key={item?.id}>
          <Image
            className="d-block w-100  h-100 object-fit-fill"
            src={item?.image}
            alt={item?.title}
          />
        </Carousel.Item>
      ))}

      {/* <Carousel.Item style={{ height: "500px" }} key="2">
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src="https://images.unsplash.com/photo-1699164802258-19f3d460a0d7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
      </Carousel.Item> */}
    </Carousel>
  );
}

export default Banner;
