# gestaodetarefas: API de Gestão de Tarefas - Criar e Concluir Tarefas

## Change ID
`add-task-manager`

## Why

Permitir o registro de tarefas com título e descrição opcional, e a marcação de conclusão dessas tarefas, alterando o status de PENDING para DONE.

## What Changes

- Criar entidade Task com campos id, title, description, status, created_at e updated_at
- Endpoint POST /tasks para criar nova tarefa com status PENDING
- Endpoint POST /tasks/{id}/done para marcar tarefa como DONE
- Repositório em memória para persistência local das tarefas

## Impact

- **Affected areas:** src/controllers, src/services, src/repositories, src/models, src/app.ts
- **Breaking change:** No
- **Risk level:** low

## Affected Specs

- `specs/create-task/spec.md`
- `specs/complete-task/spec.md`
