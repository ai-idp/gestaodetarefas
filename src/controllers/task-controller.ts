import {
  Route,
  Post,
  Get,
  Body,
  Path,
  Response,
  Tags,
} from "tsoa";
import { Task, TaskListItem, CreateTaskRequest } from "../models/task.js";
import { taskService } from "../services/task-service.js";
import { taskRepository } from "../repositories/task-repository.js";

@Route("tasks")
@Tags("Tasks")
export class TaskController {
  /**
   * Criar uma nova tarefa
   * @param body Dados da tarefa a criar
   * @returns Tarefa criada
   */
  @Post("/")
  @Response<{ message: string }>(400, "Bad Request")
  async createTask(@Body() body: CreateTaskRequest): Promise<Task> {
    try {
      return taskService.createTask(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid request";
      throw {
        status: 400,
        message,
      };
    }
  }

  /**
   * Marcar tarefa como concluída
   * @param id ID da tarefa
   * @returns Tarefa atualizada
   */
  @Post("{id}/done")
  @Response<{ message: string }>(404, "Not Found")
  async completeTask(@Path() id: string): Promise<Task> {
    try {
      return taskService.completeTask(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Not found";
      throw {
        status: 404,
        message,
      };
    }
  }

  /**
   * Obtém uma tarefa específica pelo ID
   * @param id - ID da tarefa
   * @returns A tarefa completa com todos os detalhes
   * @throws 404 NotFoundError se a tarefa não existir
   */
  @Get("{id}")
  @Response<void>(404, "Task not found")
  async getTaskById(@Path() id: string): Promise<Task> {
    const task = taskRepository.findById(id);

    if (!task) {
      throw {
        status: 404,
        message: "Task not found",
      };
    }

    return task;
  }

  /**
   * Obtém a lista de todas as tarefas
   * @returns Array de tarefas em formato resumido (TaskListItem), ordenadas por created_at descendente
   */
  @Get()
  async listTasks(): Promise<TaskListItem[]> {
    const tasks = taskRepository.findAll();

    // Converter para TaskListItem (apenas id, title, status)
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
    }));
  }
}
