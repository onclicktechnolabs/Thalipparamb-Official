// import node module libraries
import { ListGroup, Card, Image } from "react-bootstrap";
import Link from "next/link";
import { Justify } from "react-bootstrap-icons";

const PricingCard = ({ content }) => {
  return (
    <Card>
      <Card>
        <Image
          className="d-block w-100 h-100 object-fit-fill"
          src="https://images.unsplash.com/photo-1699164802258-19f3d460a0d7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
      </Card>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <h3 className="mb-3">Title</h3>
        <p className="mb-0" style={{ textAlign: "justify" }}>
          International film festival with favorite films and classic visual
          experiences of film lovers traveling with the movements of world
          cinema.
        </p>
      </Card.Body>
    </Card>
  );
};

export default PricingCard;
