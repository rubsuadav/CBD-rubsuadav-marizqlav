import { API_AUTH_URL, API_URL } from "../config";

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return { status: response.status, data: await response.json() };
}

export async function updateTaskStatus(taskId, status) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

export async function updateTask(taskId, task) {
  const response = await fetch(`${API_URL}/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return { status: response.status, data: await response.json() };
}

export async function deleteTask(taskId) {
  await fetch(`${API_URL}/task/${taskId}`, {
    method: "DELETE",
  });
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
