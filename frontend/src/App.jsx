import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// local imports
import CustomNavbar from "./components/CustomNavbar";
import { Container } from "react-bootstrap";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import TaskDetails from "./pages/TaskDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProjectDetails from "./pages/ProjectDetails";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <Router>
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
