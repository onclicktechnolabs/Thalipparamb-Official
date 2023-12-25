import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Form, Image, ListGroup, Row, Table } from "react-bootstrap";
import { singleEvent, updateEvent } from "components/api/admin/events/route";
import { formatDate, formatToLocalDate } from "widgets/utility/formateDate";

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
  const renderRow = (label, content) => (
    <Row className="mt-2">
      <Col md={4} xs={12} className="text-capitalize">
        <h4>{label}:</h4>
      </Col>
      <Col md={8} xs={12}>
        {content}
      </Col>
    </Row>
  );

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
              alt={data?.title_en}
              className="mx-auto"
              style={{ height: "350px", width: "75%", objectFit: "fit" }}
            />
          </Card>

          <Card className="mt-2 p-1 shadow">
            <Card.Title className="m-0 p-3 text-black card-head">
              Basic Information
            </Card.Title>
            <div className="p-4">
              {renderRow("title in english", <p>{data?.title_en}</p>)}
              {renderRow("title in malayalam", <p>{data?.title_ml}</p>)}
              {renderRow("venue", <p>{data?.venue}</p>)}
              {renderRow("Start date", <p>{formatDate(data?.start_date)}</p>)}
              {renderRow("End date", <p>{formatDate(data?.end_date)}</p>)}
              {renderRow(
                "status",
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
              )}
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default EventInfo;
