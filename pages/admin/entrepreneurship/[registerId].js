import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Form, Image, ListGroup, Row, Table } from "react-bootstrap";
import {
  singleComplaint,
  updateComplaint,
} from "components/api/admin/complaint/route";
import { getAllEmployes } from "components/api/admin/employee/route";
import { getSingleGreetingByGreetingType } from "components/api/admin/greetings/route";
import { downloadFile } from "widgets/utility/downloadFile";
import { saveAs } from "file-saver";

const priorityType = ["high", "low", "medium"];
const statusType = ["new", "processing", "completed"];

function ComplaintInfo() {
  const router = useRouter();
  const compalintid = router.query.compalintId;
  const [data, setData] = useState(null);
  // const [greeting, setGreeting] = useState(null);

  const [employee, setEmployee] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedPrty, setSelectedPrty] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getEmployeData = async () => {
    try {
      const res = await getAllEmployes();
      setEmployee(res);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const getComplaintData = async () => {
    try {
      const res = await singleComplaint(compalintid);
      setData(res);
    } catch (error) {
      console.error("Error fetching complaint data:", error);
    }
  };

  const getGreetingsData = async () => {
    try {
      const res = await getSingleGreetingByGreetingType(data?.type);
      return res;
    } catch (error) {
      console.error("Error fetching Greeting data:", error);
    }
  };

  const handleUpdateEmploye = async () => {
    try {
      if (selectedEmp) {
        await updateComplaint(compalintid, { assignTo: selectedEmp });
      }
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };
  const handleUpdatePrty = async () => {
    try {
      if (selectedPrty) {
        await updateComplaint(compalintid, { priority: selectedPrty });
      }
    } catch (error) {
      console.error("Error updating priority:", error.message);
    }
  };
  const handleUpdateStatus = async () => {
    try {
      if (selectedStatus) {
        await updateComplaint(compalintid, { status: selectedStatus });
      }
    } catch (error) {
      console.error("Error updating priority:", error.message);
    }
  };

  useEffect(() => {
    getEmployeData();
    getComplaintData();
  }, [compalintid]);

  useEffect(() => {
    handleUpdateEmploye();
    handleUpdatePrty();
    handleUpdateStatus();
  }, [selectedEmp, selectedPrty, selectedStatus, compalintid]);

  const handleDownload = async () => {
    const res = await getGreetingsData();
    const path = res.file;
    saveAs(path, "image.jpg");
  };

  const timestampData = (data) => {
    if (data) {
      const dateObject = new Date(
        data.seconds * 1000 + data.nanoseconds / 1000000
      );

      const formattedDate = dateObject.toDateString();

      return formattedDate;
    }
  };

  const employees = employee?.map((item) => item.name);

  return (
    <Row className="mb-3">
      <Col lg={12} md={12} xs={12} className="mt-6 ">
        <div className="m-2">
          <Card className="p-4 text-center text-l  shadow">
            <h2>Complaint Details</h2>
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
                  <h4>Date:</h4>
                </div>
                <div class="col-8">
                  <p>{timestampData(data?.created_at)}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>Phone Number:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.phone}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>User</h4>
                </div>
                <div class="col-8">
                  <p>{data?.createdBy}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>panchayath:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.panchayath}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>address:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.address}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>Type:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.type}</p>
                  <button
                    className="btn btn-outline-primary mb-2"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>description:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.description}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row">
                <div class="col-4 text-capitalize">
                  <h4>Type:</h4>
                </div>
                <div class="col-8">
                  <p>{data?.type}</p>
                </div>
                <div class="col-4 text-capitalize"></div>
              </div>

              <div class="row mt-4">
                <div class="col-4 text-capitalize">
                  <h4>Files:</h4>
                </div>
                <div class="col-8">
                  <a
                    href={data?.image}
                    className="btn btn-outline-primary  fw-bold"
                    target="_self"
                  >
                    View
                  </a>
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

              <div class="row mt-4">
                <div class="col-4 text-capitalize">
                  <h4>priority:</h4>
                </div>
                <div class="col-8">
                  <Row className="w-100">
                    <Col md={8} xs={12}>
                      <Form.Select
                        name="priority"
                        value={selectedPrty}
                        onChange={(e) => setSelectedPrty(e.target.value)}
                      >
                        <option value="">Select Priority</option>
                        {priorityType?.map((option, idx) => (
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
              <div class="row mt-4">
                <div class="col-4 text-capitalize ">
                  <h4>Assign To:</h4>
                </div>
                <div class="col-8 ">
                  <Row className="w-100">
                    <Col md={8} xs={12}>
                      <Form.Select
                        name="complaintType"
                        value={selectedEmp}
                        onChange={(e) => setSelectedEmp(e.target.value)}
                      >
                        <option value="">Select Employee</option>
                        {employees?.map((option, idx) => (
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

export default ComplaintInfo;
