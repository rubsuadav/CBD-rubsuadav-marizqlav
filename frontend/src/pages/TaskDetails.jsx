import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

// local imports
import { getTask, updateTask, deleteTask } from "../api/api";

export default function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getTask(taskId).then((data) => setTask(data));
  }, [taskId, updateTaskModal]);

  function handleTaskChange(e) {
    setError({});
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  async function handleUpdateTask(e) {
    e.preventDefault();
    if (!task.title || !task.description || !task.priority) {
      setError({ message: "All fields are required" });
      return;
    }
    if (task.title.length < 5 || task.title.length > 100) {
      setError({
        message:
          "Title must be at least 5 characters long and less than 100 characters",
      });
      return;
    } else if (task.description.length < 10 || task.description.length > 500) {
      setError({
        message:
          "Description must be at least 10 characters long and less than 500 characters",
      });
      return;
    }
    const { status, data } = await updateTask(taskId, task);
    switch (status) {
      case 400:
        setError(data);
        break;
      case 200:
        setUpdateTaskModal(false);
        setTask(data);
        alert("Tarea actualizada correctamente");
        break;
      default:
        break;
    }
  }

  async function handleDeleteTask() {
    await deleteTask(taskId);
    setShowDeleteModal(false);
    navigate("/tasks");
  }

  return (
    <div className="d-flex align-items-center" style={{ marginTop: "200px" }}>
      <Row className="justify-content-md-center w-100">
        <Col md="8">
          <Card>
            <Card.Header as="h5" className="text-center">
              {task.title}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Descripcion:</strong> {task.description}
              </Card.Text>
              <Card.Text>
                <strong>Estado:</strong> {task.status}
              </Card.Text>
              <Card.Text>
                <strong>Prioridad:</strong> {task.priority}
              </Card.Text>
              {token && (
                <div className="d-flex justify-content-between">
                  <Button
                    style={{ backgroundColor: " #808b96" }}
                    onClick={() => setUpdateTaskModal(true)}
                  >
                    Actualizar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Eliminar
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ACTUALIZAR TAREA */}
      {token && (
        <Modal
          show={updateTaskModal}
          onHide={() => setUpdateTaskModal(false)}
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateTask}>
              <Form.Group>
                <Form.Label>Nombre de la Tarea</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la tarea"
                  name="title"
                  value={task.title}
                  onChange={(e) => handleTaskChange(e)}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Ingrese la descripción de la tarea"
                  name="description"
                  value={task.description}
                  onChange={(e) => handleTaskChange(e)}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Prioridad</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={task.priority}
                  onChange={(e) => handleTaskChange(e)}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
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
      )}

      {/* ELIMINAR TAREA */}
      {token && (
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Está seguro de que desea eliminar esta tarea?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteTask}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
