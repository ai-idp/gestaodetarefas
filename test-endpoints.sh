#!/bin/bash

# Script de testes manuais para endpoints de tarefas
# Uso: bash test-endpoints.sh

BASE_URL="http://localhost:8080"
TASK_ID=""

echo "=========================================="
echo "Testes de Endpoints - Gestão de Tarefas"
echo "=========================================="
echo ""

# Teste 1: Criar tarefa com sucesso
echo "📝 TESTE 1: Criar tarefa com sucesso (POST /tasks)"
echo "Comando: curl -X POST $BASE_URL/tasks -H 'Content-Type: application/json' -d '{\"title\": \"Teste\"}'"
echo ""
RESPONSE=$(curl -s -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "Teste"}')
echo "Resposta:"
echo "$RESPONSE" | jq '.'
TASK_ID=$(echo "$RESPONSE" | jq -r '.id')
echo "ID da tarefa: $TASK_ID"
echo ""

# Teste 2: Criar tarefa com descrição
echo "📝 TESTE 2: Criar tarefa com descrição (POST /tasks)"
echo "Comando: curl -X POST $BASE_URL/tasks -H 'Content-Type: application/json' -d '{\"title\": \"Tarefa com descrição\", \"description\": \"Esta é uma descrição\"}'"
echo ""
RESPONSE=$(curl -s -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa com descrição", "description": "Esta é uma descrição"}')
echo "Resposta:"
echo "$RESPONSE" | jq '.'
echo ""

# Teste 3: Criar tarefa sem título (esperado 400)
echo "❌ TESTE 3: Criar tarefa sem título (POST /tasks) - Esperado 400"
echo "Comando: curl -X POST $BASE_URL/tasks -H 'Content-Type: application/json' -d '{}'"
echo ""
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{}')
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '$d')
echo "Status HTTP: $HTTP_STATUS"
echo "Resposta:"
echo "$BODY" | jq '.'
echo ""

# Teste 4: Criar tarefa com título vazio (esperado 400)
echo "❌ TESTE 4: Criar tarefa com título vazio (POST /tasks) - Esperado 400"
echo "Comando: curl -X POST $BASE_URL/tasks -H 'Content-Type: application/json' -d '{\"title\": \"   \"}'"
echo ""
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "   "}')
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '$d')
echo "Status HTTP: $HTTP_STATUS"
echo "Resposta:"
echo "$BODY" | jq '.'
echo ""

# Teste 5: Marcar tarefa como concluída
echo "✅ TESTE 5: Marcar tarefa como concluída (POST /tasks/{id}/done)"
echo "Usando ID: $TASK_ID"
echo "Comando: curl -X POST $BASE_URL/tasks/$TASK_ID/done -H 'Content-Type: application/json'"
echo ""
RESPONSE=$(curl -s -X POST "$BASE_URL/tasks/$TASK_ID/done" \
  -H "Content-Type: application/json")
echo "Resposta:"
echo "$RESPONSE" | jq '.'
echo ""

# Teste 6: Marcar tarefa inexistente como concluída (esperado 404)
echo "❌ TESTE 6: Marcar tarefa inexistente como concluída (POST /tasks/{id}/done) - Esperado 404"
echo "Comando: curl -X POST $BASE_URL/tasks/id-inexistente-12345/done -H 'Content-Type: application/json'"
echo ""
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/tasks/id-inexistente-12345/done" \
  -H "Content-Type: application/json")
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '$d')
echo "Status HTTP: $HTTP_STATUS"
echo "Resposta:"
echo "$BODY" | jq '.'
echo ""

echo "=========================================="
echo "Testes concluídos!"
echo "=========================================="
