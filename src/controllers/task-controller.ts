import {
  Route,
  Post,
  Body,
  Path,
  Response,
  Tags,
} from "tsoa";
import { Task, CreateTaskRequest } from "../models/task.js";
import { taskService } from "../services/task-service.js";

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
}
