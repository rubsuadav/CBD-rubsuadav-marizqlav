import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export async function updateProjectStatus(project) {
  const tasks = project.tasks;
  if (tasks.length > 0) {
    const taskId = tasks.map((task) => task._id);
    const task = await Task.find({ _id: { $in: taskId } });
    const taskStatus = task.map((task) => task.status);
    if (taskStatus.every((status) => status === "Pendiente")) {
      project.status = "Pendiente";
    } else if (taskStatus.every((status) => status === "Completada")) {
      project.status = "Completado";
    } else if (taskStatus.includes("En Progreso")) {
      project.status = "En progreso";
    } else {
      project.status = "Pendiente";
    }
  }
}

export async function assignTasks(userId, taskIds) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await Task.find({ _id: { $in: taskIds } });
    if (tasks.length !== taskIds.length) {
      throw new Error("One or more tasks not found");
    }

    const alreadyAssignedTasks = user.tasks.filter((taskId) =>
      taskIds.includes(taskId.toString())
    );
    if (alreadyAssignedTasks.length > 0) {
      throw new Error("One or more tasks already assigned to the user");
    }

    user.tasks.push(...tasks.map((task) => task._id));
    await user.save();
    return { message: "Tasks assigned successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}
