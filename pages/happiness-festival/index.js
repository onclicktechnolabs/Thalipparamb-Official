import { getAllHappiness } from "components/api/admin/happiness/route";
import HomeLayout from "layouts/HomeLayout";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { HappinessCard } from "widgets";
import HappinessBanner from "widgets/cards/HappinessBanner";
import { useRouter } from "next/router";
import { useState } from "react";

function HappinessFestival({ happinessItems }) {
    const router = useRouter();
    const { locale } = router
    const [openKnowMore, setOpenKnowMore] = useState(false);

    const t = useTranslations("common");

    return (
        <section fluid className=" px-5 px-md-4  py-3 mt-1 px-sm-0  ">
            <Row className="">
                <Col xl={{ span: 10, offset: 1 }} md={12}>
                    <Row className="mb-10">
                        <Col
                            md={12}
                            xs={12}
                            className="d-flex justify-content-center align-items-center my-4 my-md-8"
                        >
                            <h2 className="happiness fw-bold ls-sm">{t("entrepreneurship")}</h2>
                        </Col>

                        <Col className="w-100"><HappinessBanner happinessItems={happinessItems} /></Col>
                    </Row>
                </Col>
            </Row>
            <Row >
                <ButtonGroup
                    aria-label="Basic mixed styles example"
                    className="mx-auto  w-100 w-md-75 d-flex flex-column flex-md-row"
                >
                    <Button
                        variant={openKnowMore ? "primary" : "outline-primary"}
                        className="p-3 mb-2 mb-md-0"
                        onClick={() => setOpenKnowMore(!openKnowMore)}
                    >
                        {t('know-more')}
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="p-3"
                        href="/happiness-festival/register"  // Assuming this is a navigation link
                    >
                        {t('registration')}

                    </Button>
                </ButtonGroup>
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
                                    <HappinessCard content={item} locale={locale} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

HappinessFestival.Layout = HomeLayout;
export default HappinessFestival;

export async function getStaticProps({ locale }) {

    const res = await getAllHappiness();

    return {
        props: {
            messages: (await import(`../../locales/${locale}.json`)).default,
            happinessItems: res
        },
    };
}
