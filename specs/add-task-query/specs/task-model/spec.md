# task-model

## ADDED Requirements

### Requirement: task-entity-structure

**Priority:** MUST

Task entity MUST contain fields: id (UUID string), title (string), description (string nullable), status (enum PENDING|DONE), created_at (datetime), updated_at (datetime)

#### Scenario: valid-task-structure

- **WHEN** a Task entity is instantiated
- **THEN** it MUST have all required fields with correct types

### Requirement: task-status-enum

**Priority:** MUST

Task status MUST be restricted to enum values PENDING or DONE

#### Scenario: valid-status-values

- **WHEN** a Task status is set
- **THEN** it MUST only accept PENDING or DONE values

