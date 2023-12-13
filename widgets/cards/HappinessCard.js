// import node module libraries
import { ListGroup, Card, Image } from "react-bootstrap";
import Link from "next/link";
import { Justify } from "react-bootstrap-icons";

const HappinessCard = ({ content }) => {
  return (
    <Card className="h-100">
      <Card>
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src={content?.image}
          alt="Second slide"
        />
      </Card>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center m-0 p-0">
        <h3 className="mb-3 mt-2">{content?.title}</h3>
        <p className="d-block mb-0 p-2" style={{ textAlign: "justify" }}>
          {content?.description}
        </p>
      </Card.Body>
    </Card>
  );
};

export default HappinessCard;
