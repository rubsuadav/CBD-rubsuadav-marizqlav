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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// local imports
import { createTask, getTasks, updateTaskStatus } from "../api/api";

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

  async function handleTaskSubmit(e) {
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

  const columns = {
    Pendiente: {
      name: "Pendiente",
      items: tasks.filter((task) => task.status === "Pendiente"),
    },
    "En Progreso": {
      name: "En Progreso",
      items: tasks.filter((task) => task.status === "En Progreso"),
    },
    Completada: {
      name: "Completada",
      items: tasks.filter((task) => task.status === "Completada"),
    },
  };

  async function onDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    removed.status = destination.droppableId;
    destItems.splice(destination.index, 0, removed);

    setTasks(tasks.map((task) => (task._id === removed._id ? removed : task)));

    await updateTaskStatus(removed._id, removed.status);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Button
        variant="primary"
        className="mb-5 mt-5"
        onClick={() => setShowTaskModal(true)}
      >
        Crear Tarea
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Row>
            {Object.values(columns).map((column) => (
              <Col key={column.name}>
                <h2>{column.name}</h2>
                <Droppable droppableId={column.name}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      className="w-auto h-auto p-2 bg-black bg-gradient bg-opacity-50"
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 mb-2 text-white text-center"
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: "lightcoral",
                              }}
                            >
                              {item.title}
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))}
          </Row>
        </Container>
      </DragDropContext>

      {/* CREACION TAREAS */}
      <Modal
        show={showTaskModal}
        onHide={() => {
          setShowTaskModal(false);
          setTask({ title: "", description: "" });
          setError({});
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskSubmit}>
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
            <Button variant="primary" type="submit" className="mt-3">
              Crear Tarea
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
