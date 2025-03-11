import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

// local imports
import {
  getUser,
  getUserProjects,
  getUserTasks,
  getAllUsers,
  getTasks,
  assignTasksToUser,
  removeTasksFromUser,
} from "../api/api";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  useEffect(() => {
    getUser(userId).then((data) => setUser(data));
    getUserProjects(userId).then((data) => setProjects(data));
    getUserTasks(userId).then((data) => setTasks(data));
  }, [userId]);

  useEffect(() => {
    if (showAssignModal) {
      getAllUsers().then((data) => setAllUsers(data));
      getTasks().then((data) => setAllTasks(data));
    }
  }, [showAssignModal]);

  function handleTaskSelection(e) {
    const taskId = e.target.value;
    if (e.target.checked) {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    } else {
      setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId));
    }
  }

  async function handleAssignTasks() {
    if (!selectedUserId) {
      alert("Por favor, seleccione un usuario.");
      return;
    }
    if (selectedTaskIds.length === 0) {
      alert("Por favor, seleccione al menos una tarea.");
      return;
    }

    const { status, data } = await assignTasksToUser(selectedUserId, selectedTaskIds);
    if (status === 200) {
      setShowAssignModal(false);
      alert("Tareas asignadas correctamente");
      // Actualizar las tareas asignadas
      const updatedTasks = await getUserTasks(userId);
      setTasks(updatedTasks);
    } else {
      alert(data.message);
    }
  }

  async function handleUnassignTask(taskId) {
    const { status } = await removeTasksFromUser(userId, [taskId]);
    if (status === 200) {
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Tarea desasignada correctamente");
    } else {
      alert("Error al desasignar tarea");
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "50px" }}
    >
      <Row className="justify-content-md-center w-100">
        <Col md="8">
          <Card className="shadow-lg">
            <Card.Header as="h5" className="text-center bg-primary text-white">
              {user.username}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Proyectos:</strong>
                <ListGroup>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <ListGroup.Item key={project._id}>
                        {project.name}
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No hay proyectos asociados</ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Text>
              <Card.Text>
                <strong>Tareas:</strong>
                <ListGroup>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <ListGroup.Item
                        key={task._id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {task.title}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleUnassignTask(task._id)}
                        >
                          Desasignar
                        </Button>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No hay tareas asignadas</ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Text>
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => setShowAssignModal(true)}
                >
                  Asignar Tareas
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ASIGNAR TAREAS */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Asignar Tareas a Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mt-3">
              <Form.Label>Seleccionar Usuario</Form.Label>
              <Form.Control
                as="select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Seleccione un usuario</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Seleccionar Tareas</Form.Label>
              {allTasks.map((task) => (
                <Form.Check
                  key={task._id}
                  type="checkbox"
                  label={task.title}
                  value={task._id}
                  onChange={handleTaskSelection}
                />
              ))}
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                onClick={handleAssignTasks}
                className="mt-3"
              >
                Asignar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
