# create-task

## ADDED Requirements

### Requirement: Criar tarefa com título obrigatório

**Priority:** MUST

O sistema MUST aceitar requisições POST /tasks com título obrigatório e descrição opcional, retornando a tarefa criada com status PENDING

#### Scenario: Criar tarefa com título válido

- **WHEN** POST /tasks com body {"title": "Estudar arquitetura"}
- **THEN** Retorna 201 com tarefa contendo id (UUID), title, status=PENDING, created_at e updated_at

#### Scenario: Criar tarefa com título e descrição

- **WHEN** POST /tasks com body {"title": "Estudar", "description": "Arquitetura de software"}
- **THEN** Retorna 201 com tarefa contendo todos os campos incluindo description

#### Scenario: Rejeitar tarefa sem título

- **WHEN** POST /tasks com body {} ou {"title": ""}
- **THEN** Retorna 400 Bad Request com mensagem de erro indicando título obrigatório

### Requirement: Gerar identificador único

**Priority:** MUST

O sistema MUST gerar automaticamente um UUID único para cada tarefa criada

#### Scenario: ID único gerado automaticamente

- **WHEN** POST /tasks com título válido
- **THEN** Retorna tarefa com campo id no formato UUID v4

### Requirement: Registrar timestamps automaticamente

**Priority:** MUST

O sistema MUST registrar created_at e updated_at automaticamente no momento da criação

#### Scenario: Timestamps registrados na criação

- **WHEN** POST /tasks com título válido
- **THEN** Retorna tarefa com created_at e updated_at preenchidos com datetime atual (ISO 8601)

