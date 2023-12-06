import Link from "next/link";
import {
  ProgressBar,
  Col,
  Row,
  Card,
  Table,
  Image,
  Dropdown,
} from "react-bootstrap";
const ActiveProjectsData = [
  {
    id: 1,
    projectName: "Enterpreneurship Programme",
    Date: "3 May, 2023",
    staus: "Medium",
    place: "thalipparamb",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "warning",
  },
  {
    id: 2,
    projectName: "Get healthy in rural areas",
    Date: "3 May, 2023",
    staus: "High",
    place: "Trichambaram",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "danger",
  },
];

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
            <Card.Header className="bg-white d-flex justify-content-between align-items-center  py-4">
              <h4 className="mb-0">Active Events</h4>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  Filter By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Place</th>

                  <th>Date</th>
                  <th>Status</th>
                  {/* <th>Members</th>
                  <th>Progress</th> */}
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
                      <td className="align-middle">{item.place}</td>
                      <td className="align-middle">{item.Date}</td>

                      <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item.staus}
                        </span>
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
