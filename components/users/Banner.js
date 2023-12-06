import React from "react";
import { Carousel, Image } from "react-bootstrap";

function Banner() {
  return (
    <Carousel indicators={false} className="">
      <Carousel.Item style={{ height: "500px" }}>
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src="https://images.unsplash.com/photo-1699190375905-3cac33bbdbb1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: "500px" }}>
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src="https://images.unsplash.com/photo-1699164802258-19f3d460a0d7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: "500px" }}>
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src="https://images.unsplash.com/photo-1699164802258-19f3d460a0d7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
