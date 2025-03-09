import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// local imports
import CustomNavbar from "./components/CustomNavbar";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <Router>
      <CustomNavbar />
      <Container>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/task/:taskId" element={<TaskDetails />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
        </Routes>
      </Container>
    </Router>
  );
}
