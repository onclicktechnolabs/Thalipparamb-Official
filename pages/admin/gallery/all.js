import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { getAllgallery } from "components/api/admin/gallery/route";

const ActiveProjectsData = [
  {
    id: 1,
    title: "Enterpreneurship Programme",

    brandLogo: "/images/brand/dropbox-logo.svg",

    Description:
      "Renowned music bands to make the festival nights musical and thrill the hearts of the revelers",
  },
  {
    id: 2,
    title: "Get healthy in rural areas",

    brandLogo: "/images/brand/dropbox-logo.svg",

    Description:
      "Renowned music bands to make the festival nights musical and thrill the hearts of the revelers",
  },
];

function Gallery() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGalleryData = async () => {
      try {
        const res = await getAllgallery();
        setData(res);
      } catch (error) {
        console.error("Error fetching Gallery data:", error);
      }
    };

    getGalleryData();
  }, []);

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
                              alt={item.title}
                              className="img-fluid "
                            />
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item.title}</td>
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
