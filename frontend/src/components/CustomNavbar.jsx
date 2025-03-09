import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local importsº
import SearchTasks from "./SearchTasks";

export default function CustomNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-info bg-gradient" sticky="top">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          GestorPRO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/tasks")} className="mx-2">
              Tareas
            </Nav.Link>
            <SearchTasks />
            <Nav.Link href="/projects" className="mx-2">
              Proyectos
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#link" className="mx-2">
              Registrarse
            </Nav.Link>
            <Nav.Link href="#link" className="mx-2">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link href="#link" className="mx-2">
              Ver Perfil
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
