import { Task } from "../models/task.js";

class TaskRepository {
  public tasks: Map<string, Task> = new Map();

  save(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  update(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }
}

export const taskRepository = new TaskRepository();
