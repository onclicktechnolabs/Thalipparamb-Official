import { useEffect, useState } from "react";
import { getAllHappiness } from "components/api/admin/happiness/route";
import HomeLayout from "layouts/HomeLayout";
import { Col, Row } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { HappinessCard } from "widgets";
import HappinessBanner from "widgets/cards/HappinessBanner";
function Happinessfestival() {
  const t = useTranslations("home");
  const [happinessItems, setHappinessItems] = useState([]);

  const getHappiness = async () => {
    const res = await getAllHappiness();
    setHappinessItems(res);
  };

  useEffect(() => {
    getHappiness();
  }, []);

  return (
    <section fluid className=" ps-md-4 pe-md-4 px-5 py-3 mt-1 px-sm-0 ">
      <Row className="">
        <Col xl={{ span: 10, offset: 1 }} md={12}>
          <Row className="mb-10">
            <Col
              md={12}
              xs={12}
              className="d-flex justify-content-center align-items-center mb-6"
            >
              <h2 className="happiness fw-bold ls-sm">Happiness festival</h2>
            </Col>

            <Col className="w-100">{/* <HappinessBanner /> */}</Col>
          </Row>
        </Col>
      </Row>
      <div className="py-8 ">
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12}>
            <Row className="mb-10">
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
    </section>
  );
}

Happinessfestival.Layout = HomeLayout;
export default Happinessfestival;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
