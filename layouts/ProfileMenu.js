// import node module libraries
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Image, Dropdown, ListGroup } from "react-bootstrap";

// simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// import data files
import NotificationList from "data/Notification";

// import hooks
import useMounted from "hooks/useMounted";
import { useRouter } from "next/navigation";

const ProfileMenu = ({ data }) => {
  const [open, setOpen] = useState(false);

  console.log("🚀 ~ file: ProfileMenu.js:20 ~ ProfileMenu ~ data:", data);
  const router = useRouter();
  const { data: session } = useSession();
  const hasMounted = useMounted();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const handleLogout = async () => {
    console.log("Logout clicked");
    await signOut();
    router.push("/");
  };

  const ProfileMenuDesktop = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2 ">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-1.jpg"
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end"
            align="end"
            aria-labelledby="dropdownUser"
            show
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2 " bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1"> {data?.user.email}</h5>
                <Link href="/admin/settings" className="text-inherit fs-6">
                  View my profile
                </Link>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <Link href="/">
                <i className="fe fe-user me-2"></i> Edit Profile
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <i className="fe fe-power me-2" onClick={handleLogout}></i>Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  const ProfileMenuMobile = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-1.jpg"
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1"> {data?.user.email}</h5>
                <Link href="/admin/settings" className="text-inherit fs-6">
                  View my profile
                </Link>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> Edit Profile
            </Dropdown.Item>

            <Dropdown.Item onClick={() => signOut()}>
              <i className="fe fe-power me-2"></i>Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  return (
    <Fragment>
      {hasMounted && isDesktop ? <ProfileMenuDesktop /> : <ProfileMenuMobile />}
    </Fragment>
  );
};

export default ProfileMenu;
