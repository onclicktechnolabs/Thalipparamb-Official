import Link from "next/link";
import {
  ProgressBar,
  Col,
  Row,
  Card,
  Table,
  Image,
  Button,
} from "react-bootstrap";
import { ShoppingBag, Trash2 } from "react-feather";

const ActiveProjectsData = [
  {
    id: 1,
    title: "Parasshinikadav Snake Park",
    PostedOn: "3 May, 2023",
    brandLogo: "/images/brand/dropbox-logo.svg",
    place: "thalipparamb",
  },
  {
    id: 1,
    title: "Parasshinikadav Muthappan Temple",
    PostedOn: "3 May, 2023",
    brandLogo: "/images/brand/dropbox-logo.svg",
    place: "thalipparamb",
  },
];

function Tourism() {
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Tourism</h3>
            </div>
            <div>
              <Link href="/admin/Tourism/new" className="btn btn-white">
                Create New Tourism
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Tourism</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Place</th>
                  <th>Posted On</th>
                  <th>Options</th>
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
                        </div>
                      </td>
                      <td className="align-middle">{item.title}</td>
                      <td className="align-middle">{item.place}</td>
                      <td className="align-middle">{item.PostedOn}</td>

                      <td className="align-middle">
                        <div className="w-50 gap-2 d-flex justify-content-between align-items-center">
                          <Button variant="primary">
                            <ShoppingBag size="18px" />
                            Edit
                          </Button>
                          <Button variant="danger" className="px-2">
                            <Trash2 size="18px" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Tourism
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Tourism;
