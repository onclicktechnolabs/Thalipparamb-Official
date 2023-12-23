// import node module libraries
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Table, Dropdown } from "react-bootstrap";
import { MoreVertical } from "react-feather";

// import required data files
import TeamsData from "data/dashboard/TeamsData";
import { getAllEmployes } from "components/api/admin/employee/route";

const Teams = () => {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Teams.js:12 ~ Teams ~ data:", data);

  useEffect(() => {
    const getEmployeData = async () => {
      try {
        const res = await getAllEmployes();
        setData(res);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    getEmployeData();
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));

  CustomToggle.displayName = "CustomToggle";

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-muted" />
        </Dropdown.Toggle>
        <Dropdown.Menu align={"end"}>
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-white py-4">
        <h4 className="mb-0">Contacts </h4>
      </Card.Header>
      <Table responsive className="text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                {/* <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <div>
                      <Image
                        src={item.image}
                        alt=""
                        className="avatar-md avatar rounded-circle"
                      />
                    </div>
                    <div className="ms-3 lh-1">
                      <h5 className=" mb-1">{item.name}</h5>
                      <p className="mb-0">{item.email}</p>
                    </div>
                  </div>
                </td> */}
                <td className="align-middle">{item.name}</td>
                <td className="align-middle">{item.sectionRole}</td>
                <td className="align-middle">{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default Teams;
