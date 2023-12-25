import { getAllComplaints } from "components/api/admin/complaint/route";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Card, Table, Image } from "react-bootstrap";
import { formatDate } from "widgets/utility/formateDate";
// import projectsStatsData from "data/dashboard/ProjectsStatsData";
import { StatRightTopIcon } from "widgets";
import {
  Briefcase,
  ListTask,
  People,
  Bullseye,
  PencilSquare,
} from "react-bootstrap-icons";
import { useSession } from "next-auth/react";

function Complaints() {
  const { data: session, status } = useSession();

  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);

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
  const projectsStats = [
    {
      id: 0,
      title: "All",
      value: 18,
      text_color: "",
      icon: <ListTask size={18} />,
      // icon: <People size={18} />,
      statInfo: '<span className="text-dark me-2">Assigned to you</span>',
    },
    {
      id: 1,
      title: "High",
      value: 132,
      text_color: "text-danger",
      icon: <ListTask size={18} />,
      statInfo: '<span className="text-dark me-2">Urgent </span>',
    },
    {
      id: 2,
      title: "Medium",
      value: 12,
      text_color: "text-warning",
      icon: <Bullseye size={18} />,
      statInfo: '<span className="text-dark me-2">2</span> In-progress ',
    },
    {
      id: 3,
      title: "Low",
      value: 16,
      text_color: "text-success",
      icon: <Briefcase size={18} />,
      statInfo: '<span className="text-dark me-2">5</span> Completed',
    },
  ];
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6 text-center">
        <div className="d-lg-flex justify-content-between align-items-center p-4">
          <div className="mb-2 mb-lg-0">
            <h3 className="mb-0 text-dark">Complaints</h3>
          </div>
          <div>
            <Link href="/admin/complaints/new" className="btn btn-white">
              Create New Complaints
            </Link>
          </div>
        </div>
      </Col>

      <Row className="p-2">
        {projectsStats.map((item, index) => {
          return (
            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
              <StatRightTopIcon info={item} tab={tab} setTab={setTab} />
            </Col>
          );
        })}
      </Row>
      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            {/* <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Complaints</h4>
            </Card.Header> */}
            <Table responsive className="text-nowrap mb-0 shadow-t-lg">
              <thead className="">
                <tr>
                  <th>Sl. No.</th>
                  <th>Name</th>
                  <th>User</th>
                  <th>complaint Type</th>

                  <th>Complaint Date</th>
                  <th>priority</th>
                  {session?.user.role === "admin" &&
                    <th>Assigned To</th>
                  }
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item?.id}>
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link
                                href={`/admin/complaints/${item?.id}`}
                                className="text-inherit"
                              >
                                {item?.name}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{item?.createdBy}</td>
                      <td className="align-middle">{item?.type}</td>

                      <td className="align-middle">
                        {item?.created_at}
                      </td>
                      <td className="align-middle">
                        <span
                          className={`badge bg-${item?.priority === "low"
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
                      {session?.user.role === "admin" && <td className="align-middle">
                        {item.assignTo || "Assign to"}
                      </td>}
                      <td className="align-middle">{item?.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                Load more
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Complaints;
