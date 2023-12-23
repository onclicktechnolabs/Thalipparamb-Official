import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Form, Image, ListGroup, Row, Table } from "react-bootstrap";
import { singleEvent, updateEvent } from "components/api/admin/events/route";

const statusType = ["Planned", "In-Progress", "Completed", "Cancelled"];

function EventInfo() {
  const router = useRouter();
  const eventid = router.query.eventId;
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const getEventData = async () => {
    try {
      const res = await singleEvent(eventid);
      setData(res);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      if (selectedStatus) {
        await updateEvent(eventid, { status: selectedStatus });
      }
    } catch (error) {
      console.error("Error updating priority:", error.message);
    }
  };

  useEffect(() => {
    getEventData();
  }, [eventid]);

  useEffect(() => {
    handleUpdateStatus();
  }, [selectedStatus, eventid]);
  const timestampData = (data) => {
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
        <div className="m-2">
          <Card className="p-4 text-center text-l  shadow">
            <h2>Event Details</h2>
          </Card>
          <Card className="mt-2 shadow d-flex justify-content-center  p-2">
            <Card.Img
              variant="top"
              src={data?.image}
              alt={data?.title}
              className="mx-auto"
              style={{ height: "350px", width: "75%", objectFit: "fit" }}
            />
          </Card>

          <Card className="mt-2 p-1 shadow">
            <Card.Title className="m-0 p-3 text-black card-head">
              Basic Informations
            </Card.Title>
            <div className="p-4">
              <div class="row mt-4">
                <div class="col-4 text-capitalize">
                  <h4>title:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.title}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>Venu:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.place}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>Shedule Datae</h4>
                </div>
                <div class="col-8">
                  <p>{timestampData(data?.scheduleDate)}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row mt-4">
                <div class="col-4 text-capitalize">
                  <h4>status:</h4>
                </div>
                <div class="col-8">
                  <Row className="w-100">
                    <Col md={8} xs={12}>
                      <Form.Select
                        name="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        {statusType?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default EventInfo;
