import { useEffect, useState } from "react";
import {
  deleteHappiness,
  getAllHappiness,
} from "components/api/admin/happiness/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Col, Row, Card, Table, Image } from "react-bootstrap";

const ActiveProjectsData = [
  {
    id: 1,
    title: "Flower show",
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
    title: "Amusement park",
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

function Happiness() {
  const router = useRouter();
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: all.js:42 ~ Happiness ~ data:", data);

  useEffect(() => {
    const getHappinessData = async () => {
      try {
        const res = await getAllHappiness();
        setData(res);
      } catch (error) {
        console.error("Error fetching Happiness data:", error);
      }
    };

    getHappinessData();
  }, []);

  //dlete Happiness
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you shure you wand to delete");
    if (confirm) {
      await deleteHappiness(id);
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
              <h3 className="mb-0  text-dark">Happiness</h3>
            </div>
            <div>
              <Link href="/admin/happiness/new" className="btn btn-white">
                Create New Happiness
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Happiness</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "25%" }}>Image</th>

                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <Image
                              src={item?.image}
                              alt={item?.title}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="align-middle">{item?.title}</td>

                      <td className="align-middle">{item?.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Happiness
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Happiness;
