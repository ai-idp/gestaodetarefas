# task-list-query

## ADDED Requirements

### Requirement: list-tasks-endpoint

**Priority:** MUST

System MUST provide GET /tasks endpoint to retrieve all registered tasks

#### Scenario: list-all-tasks

- **WHEN** GET /tasks is called
- **THEN** system MUST return status 200 with array of tasks containing id, title, and status fields

#### Scenario: empty-list

- **WHEN** GET /tasks is called and no tasks exist
- **THEN** system MUST return status 200 with empty array

### Requirement: list-ordering

**Priority:** MUST

Task list MUST be ordered by created_at descending (most recent first)

#### Scenario: ordered-by-creation-date

- **WHEN** GET /tasks is called with multiple tasks
- **THEN** system MUST return tasks ordered by created_at in descending order

### Requirement: list-query-idempotency

**Priority:** MUST

GET /tasks MUST be idempotent and SHALL NOT modify any task state

#### Scenario: list-does-not-modify

- **WHEN** GET /tasks is called multiple times
- **THEN** system MUST return consistent results without modifying any task

