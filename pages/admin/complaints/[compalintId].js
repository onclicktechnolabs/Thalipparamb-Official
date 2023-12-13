import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { singleComplaint } from "components/api/admin/complaint/route";
import { formatDate } from "widgets/utility/formateData";

function ComplaintInfo() {
  console.log("Enter ComplaintInfo");
  const router = useRouter();
  const compalintid = router.query.compalintId;
  console.log(router.query.compalintId, "complaint Id");

  const [data, setData] = useState();
  console.log("🚀 ~ file: all.js:35 ~ Complaints ~ data:", data);

  useEffect(() => {
    const getComplaintData = async () => {
      try {
        const res = await singleComplaint(compalintid);
        setData(res);
      } catch (error) {
        console.error("Error fetching Complaint data:", error);
      }
    };

    getComplaintData();
  }, []);

  let timestampData = (data) => {
    if (data) {
      const dateObject = new Date(
        data.seconds * 1000 + data.nanoseconds / 1000000
      );

      const formattedDate = dateObject.toDateString();

      return formattedDate;
    }
  };

  return (
    <Row className="mb-3">
      <Col lg={12} md={12} xs={12} className="mt-6 ">
        <Card>
          <Card.Title className="p-6 text-center text-l">
            <h2>Complaint Details</h2>
          </Card.Title>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex gap-4">
                  <h4>title:</h4>
                  <p>{data?.title}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>title:</h4>
                  <p>{data?.title}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>Date:</h4>
                  {/* <p>dsa</p> */}
                  <p>{timestampData(data?.createdAt)}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>Phone Number:</h4>
                  <p>{data?.phone}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>priority:</h4>
                  <p>{data?.priority}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex gap-4">
                  <h4>User</h4>
                  <p>{data?.createdBy}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>status:</h4>
                  <p>{data?.status}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>panchayath:</h4>
                  <p>{data?.panchayath}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>address:</h4>
                  <p>{data?.address}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>address:</h4>
                  <p>{data?.address}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>Type:</h4>
                  <p>{data?.type}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>description:</h4>
                  <p>{data?.description}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div className="d-flex gap-4">
                  <h4>Files:</h4>
                  <div>
                    <Image
                      src={data?.image}
                      alt={data?.title}
                      className="img-fluid"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ComplaintInfo;
