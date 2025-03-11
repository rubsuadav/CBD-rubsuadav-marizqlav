import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

// local imports
import CustomNavbar from "./components/CustomNavbar";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import TaskDetails from "./pages/TaskDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProjectDetails from "./pages/ProjectDetails";
import UserDetails from "./pages/UserDetails";

export default function App() {
  // REDIRECT TO REGISTER PAGE IF NOT LOGGED IN AND TRYING TO ACCESS PROTECTED ROUTES
  function RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const isPublicRoute = ["/task/:taskId", "/project/:projectId"].some(
        (route) => location.pathname.startsWith(route)
      );

      if (isPublicRoute && !localStorage.getItem("token")) {
        navigate("/register");
      }
    }, [navigate, location]);

    return null;
  }

  return (
    <Router>
      <RedirectHandler />
      <CustomNavbar />
      <Container>
        <Routes>
          <Route index path="/tasks" element={<Tasks />}></Route>
          <Route path="/task/:taskId" element={<TaskDetails />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route
            path="/project/:projectId"
            element={<ProjectDetails />}
          ></Route>
          <Route index path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user/:userId/details" element={<UserDetails />}></Route>
        </Routes>
      </Container>
    </Router>
  );
}
