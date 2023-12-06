import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";

const ActiveProjectsData = [
  {
    id: 1,

    title: "Healthy Communities Initiative",
    date: "3 May, 2023",
    place: "Thalipparamb",
  },
  {
    id: 1,
    title: "Universal Health Access Project",
    date: "3 May, 2023",
    place: "Thalipparamb",
  },
];

function Wellness() {
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Wellness</h3>
            </div>
            <div>
              <Link href="/admin/wellness/new" className="btn btn-white">
                Create New Wellness
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Wellness</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Place</th>
                </tr>
              </thead>
              <tbody>
                {ActiveProjectsData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">{item.title}</td>
                      <td className="align-middle">{item.date}</td>
                      <td className="align-middle">{item.place}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Wellness
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Wellness;
