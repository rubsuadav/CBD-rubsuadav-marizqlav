import { Row, Col, Image } from "react-bootstrap";

// local imports
import "../styles/ExampleCarouselImage.css";

export default function ExampleCarouselImage({ text, imgSrc }) {
  return (
    <Row className="example-carousel-image">
      <Col className="text-col">
        <p>{text}</p>
      </Col>
      <Col className="image-col">
        <Image src={imgSrc} thumbnail fluid />
      </Col>
    </Row>
  );
}
