import { Task } from "../models/task.js";

/**
 * Repositório in-memory para gerenciar tarefas
 * Implementa padrão singleton para garantir uma única instância
 */
export class TaskRepository {
  private static instance: TaskRepository;
  private tasks: Map<string, Task>;

  private constructor() {
    this.tasks = new Map();
  }

  /**
   * Obtém a instância única do repositório (padrão singleton)
   */
  public static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }

  /**
   * Busca uma tarefa pelo ID
   * @param id - ID da tarefa
   * @returns A tarefa encontrada ou undefined se não existir
   */
  public findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  /**
   * Retorna todas as tarefas ordenadas por created_at em ordem decrescente
   * (mais recentes primeiro)
   * @returns Array de tarefas ordenadas
   */
  public findAll(): Task[] {
    return Array.from(this.tasks.values()).sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime()
    );
  }

  /**
   * Salva uma tarefa no repositório
   * @param task - Tarefa a ser salva
   */
  public save(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Atualiza uma tarefa no repositório
   * @param task - Tarefa a ser atualizada
   */
  public update(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Verifica se uma tarefa existe
   * @param id - ID da tarefa
   * @returns true se a tarefa existe, false caso contrário
   */
  public exists(id: string): boolean {
    return this.tasks.has(id);
  }

  /**
   * Remove uma tarefa do repositório
   * @param id - ID da tarefa
   * @returns true se a tarefa foi removida, false se não existia
   */
  public delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  /**
   * Limpa todas as tarefas do repositório (útil para testes)
   */
  public clear(): void {
    this.tasks.clear();
  }
}

// Exporta a instância única do repositório
export const taskRepository = TaskRepository.getInstance();
