import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

// local imports
import { getUser, getUserProjects, getUserTasks } from '../api/api';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(userId);
      setUser(userData);
      const userProjects = await getUserProjects(userId);
      setProjects(userProjects);
      const userTasks = await getUserTasks(userId);
      setTasks(userTasks);
    }
    fetchData();
  }, [userId]);

  return (
    <div className="d-flex align-items-center" style={{ marginTop: "200px" }}>
      <Row className="justify-content-md-center w-100">
        <Col md="8">
          <Card>
            <Card.Header as="h5" className="text-center">
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
                      <ListGroup.Item key={project._id}>{project.name}</ListGroup.Item>
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
                      <ListGroup.Item key={task._id}>{task.title}</ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No hay tareas asignadas</ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}