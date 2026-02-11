export enum TaskStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}
