import { useEffect, useState } from "react";
import {
  deleteHappiness,
  getAllHappiness,
  toggleHappiness,
} from "components/api/admin/happiness/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Col, Row, Card, Table, Image } from "react-bootstrap";
import { truncateText } from "widgets/utility/truncateText";


function Happiness() {
  const router = useRouter();
  const [data, setData] = useState([]);

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

  //delete Happiness
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you wand to delete");
    if (confirm) {
      await deleteHappiness(id);
      router.refresh();
    }
  };
  const handleToggle = async (id, isActive) => {
    await toggleHappiness(id, { active: !isActive });
    router.refresh();
  };

  // const { locale } = useRouter();

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
                  <th>options</th>
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
                              alt={item?.title_en}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="align-middle">{item?.title_en}</td>

                      <td className="align-middle ">
                        {truncateText(item?.description_en)}
                      </td>

                      <td className="align-middle gap-4">
                        <button className={item.active ? "btn btn-success me-2" : "btn btn-primary me-2 "} onClick={() => handleToggle(item?.id, item?.active)}>
                          {item.active ?
                            <i className="fe fe-toggle-right "></i> : <i className="fe fe-toggle-left "></i>
                          }
                        </button>

                        <button className="btn btn-danger" onClick={() => handleDelete(item?.id)}>
                          <i className="fe fe-trash "></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                Load more...
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Happiness;
