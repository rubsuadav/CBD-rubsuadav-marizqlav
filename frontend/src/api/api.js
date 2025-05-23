import { API_AUTH_URL, API_URL } from "../config";

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

export async function createTask(task, token) {
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(task),
  });
  return { status: response.status, data: await response.json() };
}

export async function updateTaskStatus(taskId, status, token) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return response.status;
}

export async function searchTask(priority) {
  const response = await fetch(
    `${API_URL}/tasks/priority?priority=${priority}`
  );
  return { status: response.status, data: await response.json() };
}

export async function getTask(taskId) {
  const response = await fetch(`${API_URL}/task/${taskId}`);
  return response.json();
}

export async function updateTask(taskId, task, token) {
  const response = await fetch(`${API_URL}/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(task),
  });
  return { status: response.status, data: await response.json() };
}

export async function deleteTask(taskId, token) {
  await fetch(`${API_URL}/task/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
}

export async function createProject(project, token) {
  const response = await fetch(`${API_URL}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(project),
  });
  return { status: response.status, data: await response.json() };
}

export async function getProject(projectId) {
  const response = await fetch(`${API_URL}/project/${projectId}`);
  return response.json();
}

export async function updateProject(projectId, project, token) {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(project),
  });
  return { status: response.status, data: await response.json() };
}

export async function deleteProject(projectId, token) {
  await fetch(`${API_URL}/project/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
}

export async function asociateTaskToProject(projectId, taskIds, token) {
  const response = await fetch(`${API_URL}/project/${projectId}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ taskId: taskIds }),
  });
  return { status: response.status, data: await response.json() };
}

export async function register(user) {
  const response = await fetch(`${API_AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return { status: response.status, data: await response.json() };
}

export async function login(user) {
  const response = await fetch(`${API_AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return { status: response.status, data: await response.json() };
}

export async function getUser(userId, token) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function getUserProjects(userId) {
  const response = await fetch(`${API_URL}/user/${userId}/projects`);
  return response.json();
}

export async function getUserTasks(userId) {
  const response = await fetch(`${API_URL}/user/${userId}/tasks`);
  return response.json();
}

export async function assignTasksToUser(userId, taskIds, token) {
  const response = await fetch(`${API_URL}/users/assign-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ userId, taskIds }),
  });
  return { status: response.status, data: await response.json() };
}

export async function removeTasksFromUser(userId, taskIds, token) {
  const response = await fetch(`${API_URL}/users/remove-tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ userId, taskIds }),
  });
  return { status: response.status, data: await response.json() };
}
