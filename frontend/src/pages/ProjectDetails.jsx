import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

// local imports
import { getProject, updateProject, deleteProject, asociateTaskToProject, getTasks } from "../api/api";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [updateProjectModal, setUpdateProjectModal] = useState(false);
  const [associateTaskModal, setAssociateTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const projectData = await getProject(projectId);
      setProject(projectData);
      const tasksData = await getTasks();
      setTasks(tasksData);
    }
    fetchData();
  }, [projectId, updateProjectModal]);

  function handleProjectChange(e) {
    setError({});
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  async function handleUpdateProject(e) {
    e.preventDefault();
    if (!project.name || !project.description || !project.status) {
      setError({ message: "All fields are required" });
      return;
    }
    if (project.name.length < 3 || project.name.length > 50) {
      setError({
        message:
          "Name must be at least 3 characters long and less than 50 characters",
      });
      return;
    }
    const { status, data } = await updateProject(projectId, project);
    switch (status) {
      case 400:
        setError(data);
        break;
      case 200:
        setUpdateProjectModal(false);
        setProject(data);
        alert("Proyecto actualizado correctamente");
        break;
      default:
        break;
    }
  }

  async function handleDeleteProject() {
    await deleteProject(projectId);
    setShowDeleteModal(false);
    navigate("/projects");
  }

  async function handleAssociateTasks(e) {
    e.preventDefault();
    const { status, data } = await asociateTaskToProject(projectId, selectedTasks);
    if (status === 201) {
      setAssociateTaskModal(false);
      setProject(data);
      alert("Tareas asociadas correctamente");
    } else {
      setError(data);
    }
  }

  function handleTaskSelection(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTasks([...selectedTasks, value]);
    } else {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== value));
    }
  }

  return (
    <div className="d-flex align-items-center" style={{ marginTop: "200px" }}>
      <Row className="justify-content-md-center w-100">
        <Col md="8">
          <Card>
            <Card.Header as="h5" className="text-center">
              {project.name}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Descripcion:</strong> {project.description}
              </Card.Text>
              <Card.Text>
                <strong>Estado:</strong> {project.status}
              </Card.Text>
              <Card.Text>
                <strong>Tareas:</strong>
                <ul>
                  {project.tasks && project.tasks.length > 0 ? (
                    project.tasks.map((task) => (
                      <li key={task._id}>{task.title}</li>
                    ))
                  ) : (
                    <li>No hay tareas asociadas</li>
                  )}
                </ul>
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="info" onClick={() => setUpdateProjectModal(true)}>
                  Actualizar
                </Button>
                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                  Eliminar
                </Button>
                <Button variant="primary" onClick={() => setAssociateTaskModal(true)}>
                  Asociar Tareas
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ACTUALIZAR PROYECTO */}
      <Modal
        show={updateProjectModal}
        onHide={() => setUpdateProjectModal(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProject}>
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
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Ingrese la descripción del proyecto"
                name="description"
                value={project.description}
                onChange={(e) => handleProjectChange(e)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={project.status}
                onChange={(e) => handleProjectChange(e)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completado">Completado</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Actualizar
            </Button>
          </Form>
          {error.message && (
            <p className="text-danger text-center mt-3">{error.message}</p>
          )}
        </Modal.Body>
      </Modal>

      {/* ELIMINAR PROYECTO */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Está seguro de que desea eliminar este proyecto?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ASOCIAR TAREAS */}
      <Modal
        show={associateTaskModal}
        onHide={() => setAssociateTaskModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Asociar Tareas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAssociateTasks}>
            {tasks.map((task) => (
              <Form.Group key={task._id} controlId={`task-${task._id}`}>
                <Form.Check
                  type="checkbox"
                  label={task.title}
                  value={task._id}
                  onChange={handleTaskSelection}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit" className="mt-3">
              Asociar Tareas
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