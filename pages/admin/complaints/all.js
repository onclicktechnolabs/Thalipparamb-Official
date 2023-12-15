import { getAllComplaints } from "components/api/admin/complaint/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";
import { formatDate } from "widgets/utility/formateData";

const ActiveProjectsData = [
  {
    id: 1,
    complaintsTitle: "Traffic Congestion Woes",
    Date: "3 May, 2023",
    userName: "Hashim",
    priority: "Medium",
    priorityBadgeBg: "warning",
    Status: "process",
    AssignTo: "Hashim",
    brandLogo: "/images/brand/dropbox-logo.svg",
  },
  {
    id: 2,
    complaintsTitle: "Noise Pollution Concerns",
    Date: "3 May, 2023",
    priority: "High",
    userName: "Faris",
    priorityBadgeBg: "danger",
    Status: "Completed",
    AssignTo: "Noushad",
    brandLogo: "/images/brand/dropbox-logo.svg",
  },
];

function Complaints() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getComplaintData = async () => {
      try {
        const res = await getAllComplaints();
        setData(res);
      } catch (error) {
        console.error("Error fetching Complaint data:", error);
      }
    };

    getComplaintData();
  }, []);
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Complaints</h3>
            </div>
            <div>
              <Link href="/admin/complaints/new" className="btn btn-white">
                Create New Complaints
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Complaints</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Event Type</th>

                  <th>Complaint Date</th>
                  <th>priority</th>
                  <th>Assign To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link
                                href={`/admin/complaints/${item?.id}`}
                                className="text-inherit"
                              >
                                {item?.title}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item?.createdBy}</td>
                      <td className="align-middle">{item?.type}</td>

                      <td className="align-middle">
                        {formatDate(item?.createdAt)}
                      </td>
                      {/* <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item?.priority}
                        </span>
                      </td> */}
                      <td className="align-middle">
                        <span
                          className={`badge bg-${
                            item?.priority === "low"
                              ? "info"
                              : item?.priority === "medium"
                              ? "warning"
                              : item?.priority === "high"
                              ? "danger"
                              : ""
                          }`}
                        >
                          {item?.priority}
                        </span>
                      </td>
                      <td className="align-middle">
                        {item.assignTo || "Assign to"}
                      </td>
                      <td className="align-middle">{item?.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Complaints
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Complaints;
