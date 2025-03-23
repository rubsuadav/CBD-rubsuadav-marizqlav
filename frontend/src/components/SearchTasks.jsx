import { useState } from "react";
import { Form, Button, Modal, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local imports
import { searchTask } from "../api/api";

export default function SearchTasks() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchPriority, setSearchPriority] = useState("Baja");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const navigate = useNavigate();

  async function handleSearchByPriority(e) {
    e.preventDefault();
    const { status, data } = await searchTask(searchPriority);
    switch (status) {
      case 200:
        setFilteredTasks(data);
        setShowResultsModal(true);
        break;
      case 400:
        setFilteredTasks([]);
        break;
      default:
        break;
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Button
        style={{ backgroundColor: " #7b7d7d" }}
        onClick={() => setShowTaskModal(true)}
      >
        Buscar Tareas
      </Button>
      <Modal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Elige una Prioridad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSearchByPriority}>
            <Form.Group>
              <Form.Control
                as="select"
                name="priority"
                value={searchPriority}
                onChange={(e) => setSearchPriority(e.target.value)}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Buscar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showResultsModal}
        onHide={() => setShowResultsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Resultados de la Búsqueda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {filteredTasks.map((task, index) => (
              <ListGroup.Item key={index} className="mb-2">
                <Card>
                  <Card.Body>
                    <Card.Title
                      className="text-decoration-underline"
                      style={{ cursor: "pointer", color: " #39a5ec" }}
                      onClick={() => {
                        setShowResultsModal(false);
                        setShowTaskModal(false);
                        navigate(`/task/${task._id}`);
                      }}
                    >
                      {task.title}
                    </Card.Title>
                    <Card.Text>
                      <strong>Prioridad:</strong> {task.priority} <br />
                      <strong>Estado:</strong> {task.status}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
}
