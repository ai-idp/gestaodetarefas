# task-query-by-id

## ADDED Requirements

### Requirement: get-task-by-id-endpoint

**Priority:** MUST

System MUST provide GET /tasks/{id} endpoint to retrieve a specific task by its identifier

#### Scenario: task-found

- **WHEN** GET /tasks/{id} is called with an existing task ID
- **THEN** system MUST return status 200 with complete task data (id, title, description, status, created_at, updated_at)

#### Scenario: task-not-found

- **WHEN** GET /tasks/{id} is called with a non-existing task ID
- **THEN** system MUST return status 404 with appropriate error message

### Requirement: query-idempotency

**Priority:** MUST

GET /tasks/{id} MUST be idempotent and SHALL NOT modify task state

#### Scenario: multiple-queries-same-result

- **WHEN** GET /tasks/{id} is called multiple times for the same task
- **THEN** system MUST return identical results without modifying the task

