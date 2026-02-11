# gestaodetarefas: Consulta de Tarefas - Task Manager

## Change ID
`add-task-query`

## Why

Permitir a consulta de tarefas registradas no sistema, tanto individualmente por ID quanto em lista completa, de forma simples e performática.

## What Changes

- Criar modelo Task com campos id, title, description, status, created_at, updated_at
- Criar endpoint GET /tasks/{id} para consulta por ID
- Criar endpoint GET /tasks para listagem de tarefas
- Implementar repositório in-memory para armazenamento de tarefas

## Impact

- **Affected areas:** src/models, src/controllers, src/repositories, src/app.ts
- **Breaking change:** No
- **Risk level:** low

## Affected Specs

- `specs/task-model/spec.md`
- `specs/task-query-by-id/spec.md`
- `specs/task-list-query/spec.md`
