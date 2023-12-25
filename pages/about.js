import { villages } from "data/thalipparamb/villages";
import HomeLayout from "layouts/HomeLayout";
import { useTranslations } from "next-intl";
import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";

function About({ villages }) {
  const t = useTranslations("villages");
  const ta = useTranslations("common");
  return (
    <Container fluid className="h-100 d-flex flex-column ">
      <Row className="text-center flex-grow-1 h-100 my-6">
        <h2 className="happiness fw-bold ls-sm">{ta("about")}</h2>
      </Row>
      <Row className="p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Villages</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Sl. No.</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((village, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">{t(`${village}`)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

About.Layout = HomeLayout;
export default About;


export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
      villages
    },
  };
}
