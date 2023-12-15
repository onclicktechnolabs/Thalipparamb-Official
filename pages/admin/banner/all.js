import { useEffect, useState } from "react";
import { ShoppingBag, Trash2 } from "react-feather";
import { deletebanner, getAllBanner } from "components/api/admin/banner/route";
import Link from "next/link";
import {
  Col,
  Row,
  Card,
  Table,
  Image,
  Dropdown,
  Button,
} from "react-bootstrap";
import { useRouter } from "next/navigation";

function AllBanner() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const res = await getAllBanner();
        setData(res);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    getBannerData();
  }, []);

  //dlete banner
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you shure you wand to delete");
    if (confirm) {
      await deletebanner(id);
      router.refresh();
    }
  };

  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0 text-dark">Banner</h3>
            </div>
            <div>
              <Link href="/admin/banner/new" className="btn btn-white">
                Create New Banner
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-4">
              <h4 className="mb-0">Active Banner</h4>
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
                  <th style={{ width: "25%" }}>Image</th>
                  <th>Title</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div>
                          <Image
                            src={item?.image}
                            alt={item.title}
                            className="img-fluid "
                          />
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{item.title}</td>
                    <td className="align-middle">
                      <div className="w-50 gap-2 d-flex justify-content-between align-items-center">
                        {/* <Button variant="primary">
                          <ShoppingBag size="18px" />
                          Edit
                        </Button> */}
                        <Button
                          variant="danger"
                          className="px-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size="18px" className="mx-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Banner
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AllBanner;
