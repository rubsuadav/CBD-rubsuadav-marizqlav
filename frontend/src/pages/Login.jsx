import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// local imports
import { login } from "../api/api";

export default function Login() {
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  function handleUserChange(e) {
    setError({});
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    const loginData = {
      password: user.password,
    };
    // Check if the input is an email or username
    if (user.emailOrUsername.includes("@")) {
      loginData.email = user.emailOrUsername;
    } else {
      loginData.username = user.emailOrUsername;
    }

    const { status, data } = await login(loginData);
    switch (status) {
      case 200:
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        alert("Usuario logueado correctamente");
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
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Email o Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el email o nombre de usuario"
                name="emailOrUsername"
                value={user.emailOrUsername}
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
            <Button variant="primary" type="submit" className="mt-3">
              Iniciar Sesión
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
