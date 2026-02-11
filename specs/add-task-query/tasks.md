# Tasks

## Implementation

- [ ] **1.1** Criar modelo Task e tipos relacionados
  - Criar src/models/task.ts com: (1) enum TaskStatus com valores PENDING e DONE, (2) interface Task com campos id (string), title (string), description (string | null), status (TaskStatus), created_at (Date), updated_at (Date), (3) interface TaskListItem com campos id, title, status para resposta da listagem. Exportar todos os tipos.

- [ ] **2.1** Criar repositório in-memory para tarefas (depends on: 1.1)
  - Criar src/repositories/task-repository.ts com classe TaskRepository contendo: (1) propriedade privada tasks como Map<string, Task>, (2) método findById(id: string): Task | undefined que busca tarefa pelo ID, (3) método findAll(): Task[] que retorna todas as tarefas ordenadas por created_at decrescente (mais recentes primeiro). Usar padrão singleton exportando instância única.

- [ ] **3.1** Criar controller de tarefas com endpoints GET /tasks e GET /tasks/{id} (depends on: 1.1, 2.1)
  - Criar src/controllers/task-controller.ts com classe TaskController usando decorators tsoa: (1) @Route('tasks') na classe, (2) método GET com @Get('{id}') que recebe @Path() id: string, busca no repositório e retorna Task completa ou throw NotFoundError (status 404), (3) método GET com @Get() que retorna array de TaskListItem ordenado por created_at desc. Registrar rota no src/app.ts importando o controller. Imports com extensão .js.

## Testing

- [ ] **4.1** Implementar testes de consulta de tarefas (depends on: 3.1)
  - Criar src/tests/task-query.test.ts com testes: (1) GET /tasks retorna 200 com array vazio quando não há tarefas, (2) GET /tasks retorna lista ordenada por created_at desc, (3) GET /tasks/{id} retorna 200 com dados completos da tarefa existente, (4) GET /tasks/{id} retorna 404 para ID inexistente, (5) múltiplas chamadas GET retornam mesmo resultado (idempotência).

## Documentation

- [ ] **5.1** Documentar endpoints de consulta no README (depends on: 3.1)
  - Atualizar README.md com: (1) descrição dos endpoints GET /tasks e GET /tasks/{id}, (2) exemplos de request/response para cada endpoint, (3) códigos de status possíveis (200, 404), (4) estrutura do modelo Task.

