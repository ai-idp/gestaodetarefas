# complete-task

## ADDED Requirements

### Requirement: Concluir tarefa existente

**Priority:** MUST

O sistema MUST permitir marcar uma tarefa existente como concluída via POST /tasks/{id}/done, alterando status para DONE

#### Scenario: Concluir tarefa com sucesso

- **WHEN** POST /tasks/{id}/done com id de tarefa existente com status PENDING
- **THEN** Retorna 200 com tarefa atualizada contendo status=DONE e updated_at atualizado

#### Scenario: Tarefa não encontrada

- **WHEN** POST /tasks/{id}/done com id inexistente
- **THEN** Retorna 404 Not Found com mensagem indicando que tarefa não foi encontrada

### Requirement: Atualizar timestamp na conclusão

**Priority:** MUST

O sistema MUST atualizar o campo updated_at automaticamente ao concluir uma tarefa

#### Scenario: Updated_at atualizado na conclusão

- **WHEN** POST /tasks/{id}/done com id válido
- **THEN** Campo updated_at é atualizado para datetime atual, created_at permanece inalterado

