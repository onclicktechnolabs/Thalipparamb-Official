import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Card, Table, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { deleteGallery, getAllGallery } from "components/api/admin/gallery/route";


function Gallery() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGalleryData = async () => {
      try {
        const res = await getAllGallery();
        setData(res);
      } catch (error) {
        console.error("Error fetching Gallery data:", error);
      }
    };

    getGalleryData();
  }, []);
  //delete Happiness
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      await deleteGallery(id);
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
              <h3 className="mb-0  text-dark">Gallery</h3>
            </div>
            <div>
              <Link href="/admin/gallery/new" className="btn btn-white">
                Create New Gallery
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Gallery</h4>
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
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <Image
                              src={item?.image}
                              alt={item.title_en}
                              className="img-fluid "
                            />
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item.title_en}</td>
                      <td className="align-middle gap-4">
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
                View All Gallery
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Gallery;
