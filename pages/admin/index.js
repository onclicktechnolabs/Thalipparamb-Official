// import node module libraries
import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AdminHome = () => {
  console.log("Enter Admin home");
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  console.log("🚀 ~ file: index.js:25 ~ AdminHome ~ session:", session);

  // if (!session || !(session.user.role === "admin")) {
  //   router.push("/api/auth/signin?callbackUrl=/");
  // }
  if (!session || !(session.user.role === "admin")) {
    return null;
  }

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          {ProjectsStatsData.map((item, index) => {
            return (
              <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                <StatRightTopIcon info={item} />
              </Col>
            );
          })}
        </Row>

        {/* Active Projects  */}
        <ActiveProjects />

        <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            {/* Tasks Performance  */}
            <TasksPerformance />
          </Col>
          {/* card  */}
          <Col xl={8} lg={12} md={12} xs={12}>
            {/* Teams  */}
            <Teams />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default AdminHome;
