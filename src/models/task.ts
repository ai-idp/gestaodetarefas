export enum TaskStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}

/**
 * Interface que representa um item da listagem de tarefas
 * Contém apenas os campos essenciais para exibição em listas
 */
export interface TaskListItem {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}
