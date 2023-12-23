import { useEffect, useState } from "react";
import { getAllEmployes } from "components/api/admin/employee/route";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEmployeData = async () => {
      try {
        const res = await getAllEmployes();
        setData(res);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    getEmployeData();
  }, []);

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
                {data?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">{item.phone}</td>
                      <td className="align-middle">{item.email}</td>
                      <td className="align-middle">{item.sectionRole}</td>
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
