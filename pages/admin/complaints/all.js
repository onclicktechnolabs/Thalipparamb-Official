import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";

const ActiveProjectsData = [
  {
    id: 1,
    complaintsTitle: "Traffic Congestion Woes",
    Date: "3 May, 2023",
    userName: "Hashim",
    priority: "Medium",
    priorityBadgeBg: "warning",
    Status: "process",
    AssignTo: "Hashim",
    brandLogo: "/images/brand/dropbox-logo.svg",
  },
  {
    id: 2,
    complaintsTitle: "Noise Pollution Concerns",
    Date: "3 May, 2023",
    priority: "High",
    userName: "Faris",
    priorityBadgeBg: "danger",
    Status: "Completed",
    AssignTo: "Noushad",
    brandLogo: "/images/brand/dropbox-logo.svg",
  },
];

function Complaints() {
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Complaints</h3>
            </div>
            <div>
              <Link href="/admin/employees/new" className="btn btn-white">
                Create New Complaints
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Complaints</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>User</th>

                  <th>Complaint Date</th>
                  <th>priority</th>
                  <th>Assign To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ActiveProjectsData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {item.complaintsTitle}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item.userName}</td>

                      <td className="align-middle">{item.Date}</td>
                      <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="align-middle">{item.AssignTo}</td>
                      <td className="align-middle">{item.Status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Complaints
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Complaints;
