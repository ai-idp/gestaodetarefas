import { Task, TaskStatus, CreateTaskRequest } from "../models/task.js";
import { taskRepository } from "../repositories/task-repository.js";

class TaskService {
  constructor(public repository = taskRepository) {}

  createTask(request: CreateTaskRequest): Task {
    // Validar título obrigatório
    if (!request.title || request.title.trim() === "") {
      throw new Error("Title is required");
    }

    // Gerar UUID
    const id = crypto.randomUUID();

    // Criar tarefa com status PENDING
    const task: Task = {
      id,
      title: request.title,
      description: request.description,
      status: TaskStatus.PENDING,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Salvar via repositório
    return this.repository.save(task);
  }

  completeTask(id: string): Task {
    // Buscar tarefa
    const task = this.repository.findById(id);

    // Lançar erro 404 se não encontrada
    if (!task) {
      throw new Error("Task not found");
    }

    // Atualizar status para DONE e updated_at
    task.status = TaskStatus.DONE;
    task.updated_at = new Date();

    // Salvar
    return this.repository.update(task);
  }
}

export const taskService = new TaskService();
