import {
  deleteGreetings,
  getAllGreetingss,
} from "components/api/admin/greetings/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row, Card, Table, Image, Button } from "react-bootstrap";
import { Trash2 } from "react-feather";

function Greetings() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGreetinsData = async () => {
      try {
        const res = await getAllGreetingss();
        setData(res);
      } catch (error) {
        console.error("Error fetching Greetins data:", error);
      }
    };

    getGreetinsData();
  }, []);
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you shure you wand to delete");
    if (confirm) {
      await deleteGreetings(id);
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
              <h3 className="mb-0  text-dark">Greetings</h3>
            </div>
            <div>
              <Link href="/admin/complaints/upload" className="btn btn-white">
                Upload Greetings
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Greetings</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "25%" }}>Template</th>

                  <th>Event Type</th>
                  <th className="d-flex justify-content-end">Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center align-items-center ">
                          {item?.fileType === "pdf" ? (
                            <Link href={item?.file} target="_blank">
                              View
                            </Link>
                          ) : (
                            <img
                              src={item?.file}
                              alt={item?.greetingType}
                              className="img-fluid"
                              style={{
                                width: "150px",
                                height: "80px",
                                objectFit: "fill",
                              }}
                            />
                          )}
                        </div>
                      </td>
                      <td className="align-middle">{item?.greetingType}</td>

                      <td className="d-flex justify-content-end">
                        <div className="w-50 gap-2 d-flex justify-content-end align-items-center">
                          <Button
                            variant="danger"
                            className="px-2 "
                            onClick={() => handleDelete(item?.id)}
                          >
                            <Trash2 size="18px" className="mx-1 " />
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
                View All Greetings
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Greetings;
