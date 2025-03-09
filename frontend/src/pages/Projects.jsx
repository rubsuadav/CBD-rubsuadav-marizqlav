import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local imports
import { createProject, getProjects } from "../api/api";

export default function Projects() {
  // LISTADO
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  const navigate = useNavigate();

  // CREACION
  const [project, setProject] = useState({
    name: "",
    description: "",
  });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [error, setError] = useState({});

  function handleProjectChange(e) {
    setError({});
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  async function handleProjectSubmit(e) {
    e.preventDefault();

    const { status, data } = await createProject(project);

    switch (status) {
      case 400:
        setError(data);
        break;
      case 201:
        setProjects((prevProjects) =>
          Array.isArray(prevProjects) ? [...prevProjects, data] : [data]
        );
        setShowProjectModal(false);
        break;
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Button
        variant="primary"
        className="mb-5 mt-5"
        onClick={() => setShowProjectModal(true)}
      >
        Crear Proyecto
      </Button>

      <Container>
        <Row>
          {projects.length > 0 &&
            projects.map((project) => (
              <Col key={project._id} md={4} className="mb-4">
                <Card
                  className="p-3 text-white text-center"
                  style={{ backgroundColor: "rgb(220, 140, 122)" }}
                >
                  <Card.Title
                    className="text-decoration-underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowProjectModal(false);
                      navigate(`/project/${project._id}`);
                    }}
                  >
                    {project.name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Descripción:</strong> {project.description}
                  </Card.Text>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      {/* CREACION PROYECTOS */}
      <Modal
        show={showProjectModal}
        onHide={() => {
          setShowProjectModal(false);
          setProject({ name: "", description: "" });
          setError({});
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group>
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del proyecto"
                name="name"
                value={project.name}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Ingrese la descripción del proyecto"
                name="description"
                value={project.description}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Crear Proyecto
            </Button>
          </Form>

          {error.message && (
            <p className="text-danger text-center mt-3">{error.message}</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
