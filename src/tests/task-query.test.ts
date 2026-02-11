import { TaskRepository } from "../repositories/task-repository.js";
import { TaskService } from "../services/task-service.js";
import { TaskStatus } from "../models/task.js";

/**
 * Suite de testes para consulta de tarefas (GET /tasks e GET /tasks/{id})
 * Testa os endpoints de leitura de tarefas
 */
describe("Task Query Tests", () => {
  let repository: TaskRepository;
  let service: TaskService;

  /**
   * Setup antes de cada teste
   * Cria uma nova instância do repositório e serviço, e limpa os dados
   */
  beforeEach(() => {
    repository = TaskRepository.getInstance();
    repository.clear();
    service = new TaskService(repository);
  });

  /**
   * Teste 1: GET /tasks retorna 200 com array vazio quando não há tarefas
   * Valida que a listagem funciona corretamente quando o repositório está vazio
   */
  test("GET /tasks retorna 200 com array vazio quando não há tarefas", () => {
    // Arrange
    const expectedResult: any[] = [];

    // Act
    const tasks = repository.findAll();
    const taskListItems = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
    }));

    // Assert
    expect(taskListItems).toEqual(expectedResult);
    expect(taskListItems.length).toBe(0);
  });

  /**
   * Teste 2: GET /tasks retorna lista ordenada por created_at desc
   * Valida que as tarefas são retornadas em ordem decrescente de data de criação
   * (mais recentes primeiro)
   */
  test("GET /tasks retorna lista ordenada por created_at desc", () => {
    // Arrange
    const now = new Date();
    const task1 = service.createTask({
      title: "Tarefa 1",
      description: "Primeira tarefa",
    });

    // Simular delay para ter timestamps diferentes
    const task2Data = {
      id: crypto.randomUUID(),
      title: "Tarefa 2",
      description: "Segunda tarefa",
      status: TaskStatus.PENDING,
      created_at: new Date(now.getTime() + 1000), // 1 segundo depois
      updated_at: new Date(now.getTime() + 1000),
    };
    repository.save(task2Data);

    const task3Data = {
      id: crypto.randomUUID(),
      title: "Tarefa 3",
      description: "Terceira tarefa",
      status: TaskStatus.PENDING,
      created_at: new Date(now.getTime() + 2000), // 2 segundos depois
      updated_at: new Date(now.getTime() + 2000),
    };
    repository.save(task3Data);

    // Act
    const tasks = repository.findAll();
    const taskListItems = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
    }));

    // Assert
    expect(taskListItems.length).toBe(3);
    // Verificar que estão em ordem decrescente (mais recentes primeiro)
    expect(taskListItems[0].title).toBe("Tarefa 3");
    expect(taskListItems[1].title).toBe("Tarefa 2");
    expect(taskListItems[2].title).toBe("Tarefa 1");

    // Verificar que os timestamps estão em ordem decrescente
    expect(tasks[0].created_at.getTime()).toBeGreaterThanOrEqual(
      tasks[1].created_at.getTime()
    );
    expect(tasks[1].created_at.getTime()).toBeGreaterThanOrEqual(
      tasks[2].created_at.getTime()
    );
  });

  /**
   * Teste 3: GET /tasks/{id} retorna 200 com dados completos da tarefa existente
   * Valida que uma tarefa específica pode ser recuperada com todos os seus campos
   */
  test("GET /tasks/{id} retorna 200 com dados completos da tarefa existente", () => {
    // Arrange
    const createdTask = service.createTask({
      title: "Tarefa de Teste",
      description: "Esta é uma tarefa de teste",
    });

    // Act
    const retrievedTask = repository.findById(createdTask.id);

    // Assert
    expect(retrievedTask).toBeDefined();
    expect(retrievedTask).not.toBeNull();
    expect(retrievedTask?.id).toBe(createdTask.id);
    expect(retrievedTask?.title).toBe("Tarefa de Teste");
    expect(retrievedTask?.description).toBe("Esta é uma tarefa de teste");
    expect(retrievedTask?.status).toBe(TaskStatus.PENDING);
    expect(retrievedTask?.created_at).toBeInstanceOf(Date);
    expect(retrievedTask?.updated_at).toBeInstanceOf(Date);
  });

  /**
   * Teste 4: GET /tasks/{id} retorna 404 para ID inexistente
   * Valida que a busca por um ID que não existe retorna undefined (simula 404)
   */
  test("GET /tasks/{id} retorna 404 para ID inexistente", () => {
    // Arrange
    const nonExistentId = crypto.randomUUID();

    // Act
    const task = repository.findById(nonExistentId);

    // Assert
    expect(task).toBeUndefined();
  });

  /**
   * Teste 5: Múltiplas chamadas GET retornam mesmo resultado (idempotência)
   * Valida que chamadas repetidas ao mesmo endpoint retornam os mesmos dados
   * sem efeitos colaterais
   */
  test("Múltiplas chamadas GET retornam mesmo resultado (idempotência)", () => {
    // Arrange
    const createdTask = service.createTask({
      title: "Tarefa Idempotente",
      description: "Teste de idempotência",
    });

    // Act - Fazer múltiplas chamadas GET
    const firstCall = repository.findById(createdTask.id);
    const secondCall = repository.findById(createdTask.id);
    const thirdCall = repository.findById(createdTask.id);

    // Assert - Todas as chamadas devem retornar o mesmo resultado
    expect(firstCall).toEqual(secondCall);
    expect(secondCall).toEqual(thirdCall);
    expect(firstCall?.id).toBe(createdTask.id);
    expect(firstCall?.title).toBe("Tarefa Idempotente");
    expect(firstCall?.status).toBe(TaskStatus.PENDING);

    // Verificar que a tarefa não foi modificada
    expect(firstCall?.created_at).toEqual(createdTask.created_at);
    expect(firstCall?.updated_at).toEqual(createdTask.updated_at);

    // Verificar que a listagem também é consistente
    const firstList = repository.findAll();
    const secondList = repository.findAll();
    expect(firstList.length).toBe(secondList.length);
    expect(firstList[0].id).toBe(secondList[0].id);
  });
});
