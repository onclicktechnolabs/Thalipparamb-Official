import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";
import { getAllUserData } from "components/api/auth/route";

const ActiveProjectsData = [
  {
    id: 1,
    userName: "Habeeb",
    mobile: "9523457800",
    email: "Habeeb@gmail.com",
    address: "user Address",
    // Date: "3 May, 2023",
    // staus: "Medium",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "danger",
  },
  {
    id: 2,
    userName: "Vishnu",
    mobile: "9523457800",
    email: "Vishnu@gmail.com",
    address: "user Address",
    Date: "3 May, 2023",
    staus: "Medium",
    brandLogo: "/images/brand/dropbox-logo.svg",
    priorityBadgeBg: "warning",
  },
];

function Users() {
  // const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const res = await getAllUserData();
        setData(res);
      } catch (error) {
        console.error("Error fetching Happiness data:", error);
      }
    };

    getUsersData();
  }, []);
  return (
    <>
      <Col lg={12} md={12} xs={12} className="mt-6">
        {/* Page header */}
        <div>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="mb-2 mb-lg-0">
              <h3 className="mb-0  text-dark">Users</h3>
            </div>
            <div>
              {/* <Link href="/admin/Users/new" className="btn btn-white">
                Create New Users
              </Link> */}
            </div>
          </div>
        </div>
      </Col>

      <Row className="mt-6 p-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white  py-4">
              <h4 className="mb-0">Users</h4>
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>

                  {/* <th>Members</th>
                  <th>Progress</th> */}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          {/* <div>
                            <div
                              className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}
                            >
                              <Image src={item.brandLogo} alt="" />
                            </div>
                          </div> */}
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {item.name}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      {/* <td className="align-middle">{item.mobile}</td> */}
                      <td className="align-middle">{item.email}</td>

                      {/* <td className="align-middle">
                        <span className={`badge bg-${item.priorityBadgeBg}`}>
                          {item.staus}
                        </span>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
              <Link href="#" className="link-primary">
                View All Users
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Users;
