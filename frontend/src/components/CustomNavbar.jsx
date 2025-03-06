import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-info bg-gradient" sticky="top">
      <Container>
        <Navbar.Brand href="/">GestorPRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/tasks" className="mx-2">
              Tareas
            </Nav.Link>
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
