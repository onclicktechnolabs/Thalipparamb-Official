import { Card } from "react-bootstrap";

const HappinessCard = ({ content, locale }) => {

  return (
    <Card className="h-100">
      <Card>
        <Card.Img
          variant="top"
          src={content?.image}
          className="d-block w-100 h-100 object-fit-fill"
          alt="Card Image"
        />
      </Card>
      <Card.Body className="d-flex flex-column align-items-center m-0 py-2">
        <h3 className="my-3 text-center">  {content?.[`title_${locale}`]}</h3>
        <p className="d-block " style={{ textAlign: "center" }}>
          {content?.[`description_${locale}`]}
        </p>
      </Card.Body>
    </Card>
  );
};

export default HappinessCard;
