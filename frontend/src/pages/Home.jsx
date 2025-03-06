import { useState } from "react";
import { Carousel } from "react-bootstrap";

// local imports
import ExampleCarouselImage from "../components/ExampleCarouselImage";
import "../styles/Home.css";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="custom-carousel"
    >
      <Carousel.Item>
        <ExampleCarouselImage
          text="Gestión de Proyectos"
          imgSrc="/images/image_gestionar_tareas.png"
        />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage
          text="Gestión de Tareas"
          imgSrc="/images/gitHub_proyect.png"
        />
      </Carousel.Item>
    </Carousel>
  );
}
