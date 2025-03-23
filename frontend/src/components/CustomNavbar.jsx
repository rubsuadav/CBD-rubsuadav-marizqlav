import { useState } from "react";
import { Navbar, Container, Nav, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local importsº
import SearchTasks from "./SearchTasks";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);

  function confirmLogout() {
    localStorage.clear();
    navigate("/register");
    alert("Sesión cerrada correctamente");
    setShowModal(false);
  }

  function navigateToProfile() {
    navigate(`/user/${userId}/details`);
  }

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "rgb(105, 167, 209)" }} sticky="top">
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
              <Nav.Link onClick={() => navigate("/projects")} className="mx-2">
                Proyectos
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!localStorage.getItem("token") ? (
                <>
                  <Nav.Link
                    onClick={() => navigate("/register")}
                    className="mx-2"
                  >
                    Registrarse
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/login")} className="mx-2">
                    Iniciar Sesión
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowModal(true)} className="mx-2">
                    Cerrar Sesión
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigateToProfile()}
                    className="mx-2"
                  >
                    Ver Perfil
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
