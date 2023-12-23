import { useEffect, useState } from "react";
import { deleteEvent, getAllEvents } from "components/api/admin/events/route";
import { ShoppingBag, Trash2 } from "react-feather";
import Link from "next/link";
import {
  ProgressBar,
  Col,
  Row,
  Card,
  Table,
  Image,
  Dropdown,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { formatDate } from "widgets/utility/formateData";

const ActiveProjectsData = [
  {
    id: 1,
    projectName: "Enterpreneurship Programme",
    Date: "3 May, 2023",
    staus: "Medium",
    place: "thalipparamb",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "warning",
  },
  {
    id: 2,
    projectName: "Get healthy in rural areas",
    Date: "3 May, 2023",
    staus: "High",
    place: "Trichambaram",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "danger",
  },
];

function AllEvents() {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: all.js:40 ~ AllEvents ~ data:", data);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const res = await getAllEvents();
        setData(res);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    getBannerData();
  }, []);

  //dlete banner
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you shure you wand to delete");
    if (confirm) {
      await deleteEvent(id);
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
              <h3 className="mb-0  text-dark">Events</h3>
            </div>
            <div>
              <Link href="/admin/events/new" className="btn btn-white">
                Create New Events
              </Link>
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white d-flex justify-content-between align-items-center  py-4">
              <h4 className="mb-0">Active Events</h4>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  Filter By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Place</th>

                  <th>Date</th>
                  <th>Status</th>
                  {/* <th>Members</th>
                  <th>Progress</th> */}
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      {/* <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div
                              className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}
                            >
                              <Image src={item.brandLogo} alt="" />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {item.projectName}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td> */}
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link
                                href={`/admin/events/${item?.id}`}
                                className="text-inherit"
                              >
                                {item?.title}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>

                      <td className="align-middle">{item?.place}</td>
                      <td className="align-middle">
                        {formatDate(item?.scheduleDate)}
                      </td>

                      <td className="align-middle">
                        <span
                          className={`badge bg-${
                            item?.status === "Planned"
                              ? "info"
                              : item?.status === "In-Progress"
                              ? "warning"
                              : item?.status === "Completed"
                              ? "success"
                              : item?.status === "Cancelled"
                              ? "danger"
                              : ""
                          }`}
                        >
                          {item?.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Events
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AllEvents;
