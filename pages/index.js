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
import { getAllBanner } from "components/api/admin/banner/route";
import { getAllGallery } from "components/api/admin/gallery/route";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// import { getServerSession } from "next-auth";

const Home = ({ bannerItems, happinessItems, events, galleryItems }) => {
  const { locale } = useRouter();
 
  const t = useTranslations("common");
  // const session = await getServerSession(options);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/");
  // }

  return (
    <Container fluid className=" ps-md-4 pe-md-4 px-5 py-3 mt-1 px-sm-0 ">

      {/* Banner */}
      <Banner bannerItems={bannerItems} />

      {/* Happiness */}
      <Row className="py-8 ">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="">
            <Col
              md={12}
              xs={12}
              className="mb-6 d-flex justify-content-center align-items-center text-center "
            >
              <h2 className="happiness fw-bold ls-sm ">{t("festival")}</h2>
            </Col>
            {happinessItems?.map((item) => (
              <Col
                xl={4}
                lg={6}
                md={12}
                xs={12}
                className="mb-5"
                key={item?.id}
              >
                <HappinessCard content={item} locale={locale} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Events  */}
      <Row className="py-8 ">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">{t("event")}</h2>
            </Col>
            <Col xl={12} lg={12} md={12} xs={12} >
              <EventCard events={events} />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* end Events  */}

      {/* gallery*/}
      <Row id="gallery" className="py-8">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className=" ">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">{t("image-gallery")}</h2>
            </Col>
            <Col className="d-flex mb-3 w-100">
              <GalleryCard galleryItems={galleryItems} locale={locale} />
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

  const events = await getAllEvents();
  const happiness = await getAllHappiness();
  const banners = await getAllBanner();
  const galleryItems = await getAllGallery();

  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
      events: events,
      happinessItems: happiness,
      bannerItems: banners,
      galleryItems: galleryItems
    },
  };
}
