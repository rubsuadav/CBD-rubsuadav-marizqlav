import { useEffect, useState } from "react";
import { Button, ListGroup, Form, Modal } from "react-bootstrap";

// local imports
import { createTask, getTasks } from "../api/api";

export default function Tasks() {
  // LISTADO
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  // CREACION
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [error, setError] = useState({});

  function handleTaskChange(e) {
    setError({});
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  async function handleProjectSubmit(e) {
    e.preventDefault();

    const { status, data } = await createTask(task);

    switch (status) {
      case 400:
        setError(data);
        break;
      case 201:
        setTasks([...tasks, data]);
        setShowTaskModal(false);
        break;
    }
  }

  return (
    <>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowTaskModal(true)}
      >
        Crear Tarea
      </Button>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task._id}>{task.title}</ListGroup.Item>
        ))}
      </ListGroup>

      {/* CREACION TAREAS */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group>
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la tarea"
                name="title"
                value={task.title}
                onChange={(e) => handleTaskChange(e)}
              />
            </Form.Group>
            <Form.Group>
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
            <Button variant="primary" type="submit">
              Crear Tarea
            </Button>
          </Form>

          {error.message && (
            <p className="text-danger text-center mt-3">{error.message}</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
