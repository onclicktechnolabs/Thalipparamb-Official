import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";

const ActiveProjectsData = [
  {
    id: 1,
    title: "Enterpreneurship Programme",
    name: "Hashim",
    role: "Happiness",
    mobile: "9523457800",
    email: "sampleEmail@gmail.com",
    address: "user Address",
    // Date: "3 May, 2023",
    // staus: "Medium",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "danger",
    Description:
      "Renowned music bands to make the festival nights musical and thrill the hearts of the revelers",
  },
  {
    id: 2,
    title: "Get healthy in rural areas",
    name: "Noushad",
    role: "Tourism	",
    mobile: "9523457800",
    email: "sampleEmail@gmail.com",
    address: "user Address",
    Date: "3 May, 2023",
    staus: "Medium",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "warning",
    Description:
      "Renowned music bands to make the festival nights musical and thrill the hearts of the revelers",
  },
];

function Employees() {
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Employees</h3>
            </div>
            <div>
              <Link href="/admin/employees/new" className="btn btn-white">
                Create New Employ
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Employees</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>role</th>
                </tr>
              </thead>
              <tbody>
                {ActiveProjectsData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">{item.mobile}</td>
                      <td className="align-middle">{item.email}</td>
                      <td className="align-middle">{item.role}</td>

                      {/* <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item.priority}
                        </span>
                      </td> */}
                      {/* <td className="align-middle">
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
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Employees
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Employees;
