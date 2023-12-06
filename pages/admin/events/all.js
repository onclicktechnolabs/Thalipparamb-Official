import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";

function allEvents() {
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Events</h3>
            </div>
            <div>
              <Link href="/admin/events/new" className="btn btn-white">
                Create New Events
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Active Events</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Project name</th>
                  <th>Hours</th>
                  <th>priority</th>
                  <th>Members</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {ActiveProjectsData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div
                              className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}
                            >
                              <Image src={item.brandLogo} alt="" />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {item.projectName}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item.hours}</td>
                      <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="avatar-group">
                          {item.members.map((avatar, avatarIndex) => {
                            return (
                              <span
                                className="avatar avatar-sm"
                                key={avatarIndex}
                              >
                                <Image
                                  alt="avatar"
                                  src={avatar.image}
                                  className="rounded-circle"
                                />
                              </span>
                            );
                          })}
                          <span className="avatar avatar-sm avatar-primary">
                            <span className="avatar-initials rounded-circle fs-6">
                              +5
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="align-middle text-dark">
                        <div className="float-start me-3">{item.progress}%</div>
                        <div className="mt-2">
                          <ProgressBar
                            now={item.progress}
                            style={{ height: "5px" }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Events
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default allEvents;
