import React, { useEffect, useState } from "react";
import { getAllEvents } from "components/api/admin/events/route";
import { getAllHappiness } from "components/api/admin/happiness/route";
import { Card, Carousel, Col, Image } from "react-bootstrap";
import Slider from "react-slick";

function HappinessBanner() {
  const [happinessItems, setHappinessItems] = useState([]);
  console.log(
    "🚀 ~ file: HappinessBanner.js:8 ~ HappinessBanner ~ happinessItems:",
    happinessItems
  );

  const getHappiness = async () => {
    const res = await getAllHappiness();
    setHappinessItems(res);
  };
  useEffect(() => {
    getHappiness();
  }, []);

  return (
    <Col className="w-100 d-flex mb-3 ">
      {happinessItems?.map((item) => (
        <Card
          xl={12}
          lg={12}
          md={12}
          xs={12}
          style={{ width: "100%" }}
          className=" "
        >
          <Card.Img
            variant="top"
            className="d-block w-100  h-48 md:h-64 aspect-square img-fluid"
            style={{ objectFit: "fill", height: "100%" }}
            src={item?.image}
            alt={item?.title}
          />
          <Card.Body>
            <Card.Title> {item?.title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
}

export default HappinessBanner;
