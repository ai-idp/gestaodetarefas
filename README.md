# gestaodetarefas

API de gerenciamento de tarefas com endpoints para criar, listar, consultar e marcar tarefas como concluídas.

## Endpoints de Consulta

### GET /tasks

Retorna a lista de todas as tarefas ordenadas por data de criação (mais recentes primeiro).

**Request:**
```http
GET /tasks HTTP/1.1
Host: localhost:8080
```

**Response (200 OK):**
```json
[
  {
    "id": "task-001",
    "title": "Implementar autenticação",
    "status": "PENDING"
  },
  {
    "id": "task-002",
    "title": "Revisar código",
    "status": "DONE"
  }
]
```

**Estrutura da resposta:**
- `id` (string): Identificador único da tarefa
- `title` (string): Título da tarefa
- `status` (string): Status da tarefa - `PENDING` ou `DONE`

**Códigos de status:**
- `200 OK`: Lista retornada com sucesso (pode estar vazia)

---

### GET /tasks/{id}

Retorna os dados completos de uma tarefa específica pelo ID.

**Request:**
```http
GET /tasks/task-001 HTTP/1.1
Host: localhost:8080
```

**Response (200 OK):**
```json
{
  "id": "task-001",
  "title": "Implementar autenticação",
  "description": "Adicionar autenticação JWT ao sistema",
  "status": "PENDING",
  "created_at": "2026-02-11T19:25:19.689Z",
  "updated_at": "2026-02-11T19:25:19.689Z"
}
```

**Response (404 Not Found):**
```json
{
  "message": "Tarefa não encontrada"
}
```

**Estrutura da resposta (sucesso):**
- `id` (string): Identificador único da tarefa
- `title` (string): Título da tarefa
- `description` (string | null): Descrição detalhada da tarefa (pode ser nula)
- `status` (string): Status da tarefa - `PENDING` ou `DONE`
- `created_at` (string): Data e hora de criação (ISO 8601)
- `updated_at` (string): Data e hora da última atualização (ISO 8601)

**Códigos de status:**
- `200 OK`: Tarefa encontrada e retornada com sucesso
- `404 Not Found`: Tarefa com o ID especificado não existe

---

## Modelo Task

O modelo Task representa uma tarefa no sistema com os seguintes campos:

```typescript
interface Task {
  id: string;                    // Identificador único
  title: string;                 // Título obrigatório
  description: string | null;    // Descrição opcional
  status: TaskStatus;            // PENDING ou DONE
  created_at: string;            // Data de criação (ISO 8601)
  updated_at: string;            // Data da última atualização (ISO 8601)
}

enum TaskStatus {
  PENDING = "PENDING",
  DONE = "DONE"
}
```

---

## Exemplos de Uso

### Listar todas as tarefas
```bash
curl -X GET http://localhost:8080/tasks
```

### Obter tarefa específica
```bash
curl -X GET http://localhost:8080/tasks/task-001
```

### Criar nova tarefa
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar autenticação",
    "description": "Adicionar autenticação JWT ao sistema"
  }'
```

### Marcar tarefa como concluída
```bash
curl -X POST http://localhost:8080/tasks/task-001/done
```

---

## Características

- ✅ Endpoints de consulta (GET /tasks, GET /tasks/{id})
- ✅ Criação de tarefas (POST /tasks)
- ✅ Marcar tarefas como concluídas (POST /tasks/{id}/done)
- ✅ Armazenamento em memória
- ✅ Documentação automática via OpenAPI
- ✅ Health check em GET /health
