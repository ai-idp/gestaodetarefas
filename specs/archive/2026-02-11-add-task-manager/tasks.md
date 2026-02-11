# Tasks

## Implementation

- [ ] **1.1** Criar modelo Task e tipos relacionados
  - Criar src/models/task.ts com: (1) Enum TaskStatus com valores PENDING e DONE, (2) Interface Task com campos id (string), title (string), description (string | undefined), status (TaskStatus), created_at (Date) e updated_at (Date), (3) Interface CreateTaskRequest com title (string) e description opcional. Exportar todos os tipos.

- [ ] **1.2** Criar repositório de tarefas em memória (depends on: 1.1)
  - Criar src/repositories/task-repository.ts com classe TaskRepository contendo: (1) Map<string, Task> privado para armazenamento em memória, (2) Método save(task: Task): Task que adiciona tarefa ao Map e retorna a tarefa, (3) Método findById(id: string): Task | undefined que busca tarefa pelo id, (4) Método update(task: Task): Task que atualiza tarefa existente. Exportar instância singleton do repositório.

- [ ] **2.1** Criar serviço de tarefas com lógica de negócio (depends on: 1.1, 1.2)
  - Criar src/services/task-service.ts com classe TaskService contendo: (1) Método createTask(request: CreateTaskRequest): Task que valida título obrigatório, gera UUID (crypto.randomUUID), define status=PENDING, created_at e updated_at com new Date(), e salva via repositório, (2) Método completeTask(id: string): Task que busca tarefa, lança erro 404 se não encontrada, atualiza status para DONE e updated_at, e salva. Injetar TaskRepository no construtor.

- [ ] **2.2** Criar controller tsoa e registrar rotas (depends on: 2.1)
  - Criar src/controllers/task-controller.ts com classe TaskController usando decorators tsoa: (1) @Route('tasks') na classe, (2) @Post('/') createTask(@Body() body: CreateTaskRequest): Promise<Task> retornando 201, (3) @Post('{id}/done') completeTask(@Path() id: string): Promise<Task> retornando 200. Tratar erros com @Response para 400 e 404. Registrar RegisterRoutes no src/app.ts após gerar rotas com tsoa.

## Testing

- [ ] **3.1** Testar endpoints manualmente (depends on: 2.2)
  - Testar via curl ou ferramenta HTTP: (1) POST http://localhost:8080/tasks com {"title": "Teste"} - esperar 201 com tarefa status=PENDING, (2) POST http://localhost:8080/tasks com {} - esperar 400, (3) POST http://localhost:8080/tasks/{id-retornado}/done - esperar 200 com status=DONE, (4) POST http://localhost:8080/tasks/id-inexistente/done - esperar 404. Verificar timestamps e formato UUID.

