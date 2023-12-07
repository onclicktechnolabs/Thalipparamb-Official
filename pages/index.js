import Link from "next/link";
import { Col, Row, Container } from "react-bootstrap";

// import sub components
import { PricingCard, PageHeading, FeatureLeftTopIcon } from "widgets";

// import data files
import { standard, multisite, extended } from "data/pricing/PricingPlansData";
import FAQsData from "data/pricing/FAQsData";
import FeaturesData from "data/pricing/FeaturesData";
import Banner from "components/users/Banner";

import HomeLayout from "layouts/HomeLayout";
import GalleryCard from "widgets/cards/GalleryCard";
import EventCard from "widgets/cards/EventCard";
const Home = () => {
  return (
    <Container fluid className=" ps-md-4 pe-md-4 px-5 py-3 mt-1 px-sm-0 ">
      {/* Page Heading */}
      <Banner />
      {/* <PageHeading heading="Pricing" /> */}
      <div className="py-8 ">
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12}>
            <Row className="mb-10">
              <Col
                md={12}
                xs={12}
                className="mb-6 d-flex justify-content-center align-items-center"
              >
                <h2 className="happiness fw-bold ls-sm ">Happiness Festival</h2>
              </Col>
              <Col xl={4} lg={6} md={12} xs={12} className="mb-3">
                {/* Standard Pricing Card */}

                <PricingCard content={standard} />
              </Col>
              <Col xl={4} lg={6} md={12} xs={12} className="mb-3">
                {/* Multisite Pricing Card */}
                <PricingCard content={multisite} />
              </Col>
              <Col xl={4} lg={6} md={12} xs={12} className="mb-3">
                {/* Extended Pricing Card */}
                <PricingCard content={extended} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* Events  */}
      <Row className="">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="mb-10">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">Events</h2>
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
            <Col xl={6} lg={6} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* end Events  */}
      {/* gallery*/}
      <Row>
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="mb-10">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">Image Gallery</h2>
            </Col>
            <Col className="d-flex mb-3">
              <GalleryCard />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* end gallery */}
    </Container>
  );
};
Home.Layout = HomeLayout;
export default Home;
