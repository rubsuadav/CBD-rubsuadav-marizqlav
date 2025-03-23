import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local imports
import { register } from "../api/api";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    // To check the password
    password2: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  function handleUserChange(e) {
    setError({});
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (user.password !== user.password2) {
      setError({ message: "Passwords do not match" });
      return;
    }
    const { status, data } = await register(user);
    switch (status) {
      case 201:
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        alert("Usuario registrado correctamente");
        navigate("/");
        break;
      case 400:
        setError({ message: data.message });
        break;
      default:
        break;
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "600px" }}
    >
      <Container style={{ maxWidth: "500px" }}>
        <Card className="p-3">
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de usuario"
                name="username"
                value={user.username}
                onChange={(e) => handleUserChange(e)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el correo electrónico"
                name="email"
                value={user.email}
                onChange={(e) => handleUserChange(e)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                name="password"
                value={user.password}
                onChange={(e) => handleUserChange(e)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repita la contraseña"
                name="password2"
                value={user.password2}
                onChange={(e) => handleUserChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Registrarse
            </Button>
            {error.message && (
              <p className="text-danger text-center mt-3">{error.message}</p>
            )}
          </Form>
        </Card>
      </Container>
    </div>
  );
}
