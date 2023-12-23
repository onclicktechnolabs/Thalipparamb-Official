import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

// import sub components
import HappinessCard from "widgets/cards/HappinessCard";
import Banner from "components/users/Banner";
import EventCard from "widgets/cards/EventCard";
import HomeLayout from "layouts/HomeLayout";
import GalleryCard from "widgets/cards/GalleryCard";
import { getAllHappiness } from "components/api/admin/happiness/route";
import { getAllEvents } from "components/api/admin/events/route";

// import data files
import { useTranslations } from "next-intl";

// import { getServerSession } from "next-auth";

const Home = () => {
  const t = useTranslations("home");

  // const session = await getServerSession(options);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/");
  // }

  const [happinessItems, setHappinessItems] = useState([]);
  const [eventItems, setEventsItems] = useState([]);

  const getHappiness = async () => {
    const res = await getAllHappiness();
    setHappinessItems(res);
  };
  const getEvents = async () => {
    const res = await getAllEvents();
    setEventsItems(res);
  };
  useEffect(() => {
    getHappiness();
    getEvents();
  }, []);

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
                <h2 className="happiness fw-bold ls-sm ">{t("festivel")}</h2>
              </Col>
              {happinessItems?.map((item) => (
                <Col
                  xl={4}
                  lg={6}
                  md={12}
                  xs={12}
                  className="mb-3"
                  key={item?.id}
                >
                  {/* Standard Pricing Card */}

                  <HappinessCard content={item} />
                </Col>
              ))}
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
              <h2 className="happiness fw-bold ls-sm">{t("event")}</h2>
            </Col>
            {/* {eventItems?.map((item) => (
              <Col
                xl={6}
                lg={6}
                md={12}
                xs={12}
                className="mb-3"
                key={item?.id}
                style={{ height: "280px" }}
              >
                <EventCard item={item} />
              </Col>
            ))} */}

            <Col xl={12} lg={12} md={12} xs={12} className="mb-3">
              <EventCard />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* end Events  */}
      {/* gallery*/}
      <Row id="gallery">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="mb-10">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">{t("gallery")}</h2>
            </Col>
            <Col className="d-flex mb-3 w-100">
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
    },
  };
}
