# Testes Manuais - Endpoints de Tarefas

## Configuração
- **Base URL**: http://localhost:8080
- **Porta**: 8080
- **Comando para iniciar**: `npm start`

---

## Teste 1: Criar tarefa com sucesso (POST /tasks)
**Esperado**: 201 Created com tarefa status=PENDING

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Teste"}'
```

**Resposta esperada**:
```json
{
  "id": "uuid-aqui",
  "title": "Teste",
  "description": null,
  "status": "PENDING",
  "created_at": "2026-02-11T19:05:19.614Z",
  "updated_at": "2026-02-11T19:05:19.614Z"
}
```

**Validações**:
- ✅ Status HTTP: 201
- ✅ Campo `id` é UUID válido
- ✅ Campo `status` é "PENDING"
- ✅ Campos `created_at` e `updated_at` são timestamps ISO 8601
- ✅ Campo `description` é null (não fornecido)

---

## Teste 2: Criar tarefa com descrição (POST /tasks)
**Esperado**: 201 Created com descrição preenchida

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa com descrição", "description": "Esta é uma descrição"}'
```

**Resposta esperada**:
```json
{
  "id": "uuid-aqui",
  "title": "Tarefa com descrição",
  "description": "Esta é uma descrição",
  "status": "PENDING",
  "created_at": "2026-02-11T19:05:19.614Z",
  "updated_at": "2026-02-11T19:05:19.614Z"
}
```

**Validações**:
- ✅ Status HTTP: 201
- ✅ Campo `description` contém o texto fornecido

---

## Teste 3: Criar tarefa sem título (POST /tasks)
**Esperado**: 400 Bad Request

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Resposta esperada**:
```json
{
  "status": 400,
  "message": "Title is required"
}
```

**Validações**:
- ✅ Status HTTP: 400
- ✅ Mensagem de erro: "Title is required"

---

## Teste 4: Criar tarefa com título vazio (POST /tasks)
**Esperado**: 400 Bad Request

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "   "}'
```

**Resposta esperada**:
```json
{
  "status": 400,
  "message": "Title is required"
}
```

**Validações**:
- ✅ Status HTTP: 400
- ✅ Validação de espaços em branco

---

## Teste 5: Marcar tarefa como concluída (POST /tasks/{id}/done)
**Esperado**: 200 OK com status=DONE

**Passo 1**: Criar tarefa (copiar o `id` da resposta)
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa para completar"}'
```

**Passo 2**: Marcar como concluída (substituir `{id}` pelo id retornado)
```bash
curl -X POST http://localhost:8080/tasks/{id}/done \
  -H "Content-Type: application/json"
```

**Resposta esperada**:
```json
{
  "id": "{id}",
  "title": "Tarefa para completar",
  "description": null,
  "status": "DONE",
  "created_at": "2026-02-11T19:05:19.614Z",
  "updated_at": "2026-02-11T19:05:20.614Z"
}
```

**Validações**:
- ✅ Status HTTP: 200
- ✅ Campo `status` mudou para "DONE"
- ✅ Campo `updated_at` foi atualizado (timestamp mais recente)
- ✅ Campo `created_at` permanece inalterado

---

## Teste 6: Marcar tarefa inexistente como concluída (POST /tasks/{id-inexistente}/done)
**Esperado**: 404 Not Found

```bash
curl -X POST http://localhost:8080/tasks/id-inexistente-12345/done \
  -H "Content-Type: application/json"
```

**Resposta esperada**:
```json
{
  "status": 404,
  "message": "Task not found"
}
```

**Validações**:
- ✅ Status HTTP: 404
- ✅ Mensagem de erro: "Task not found"

---

## Resumo de Validações

| Teste | Endpoint | Método | Esperado | Status |
|-------|----------|--------|----------|--------|
| 1 | POST /tasks | POST | 201 + PENDING | ✅ |
| 2 | POST /tasks | POST | 201 + descrição | ✅ |
| 3 | POST /tasks | POST | 400 + erro | ✅ |
| 4 | POST /tasks | POST | 400 + validação | ✅ |
| 5 | POST /tasks/{id}/done | POST | 200 + DONE | ✅ |
| 6 | POST /tasks/{id}/done | POST | 404 + erro | ✅ |

---

## Notas Importantes

1. **UUID**: Cada tarefa recebe um UUID único gerado via `crypto.randomUUID()`
2. **Timestamps**: Todos os timestamps estão em formato ISO 8601 (UTC)
3. **Armazenamento**: As tarefas são armazenadas em memória (Map) - serão perdidas ao reiniciar
4. **Validação**: O título é obrigatório e não pode conter apenas espaços em branco
5. **Status**: Apenas PENDING e DONE são valores válidos

---

## Executar Testes

Para executar todos os testes de forma automatizada, use:

```bash
# Terminal 1: Iniciar servidor
npm start

# Terminal 2: Executar testes
bash TESTING.sh
```

Ou execute manualmente cada comando curl acima.
