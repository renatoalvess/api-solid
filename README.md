# API Solid

## Tabela de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Começando](#começando)
- [Rodando os Testes](#rodando-os-testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Conceitos Técnicos](#conceitos-técnicos)
- [Licença](#licença)

## Sobre o Projeto

API REST desenvolvida com princípios SOLID e Clean Architecture para gerenciamento de academias e check-ins. O projeto simula uma aplicação do tipo GymPass, permitindo que usuários realizem check-ins em academias próximas.

### Arquitetura e Padrões

- **SOLID Principles**:
- **Clean Architecture**

## Funcionalidades Principais

- **Autenticação**: Registro, login e refresh de tokens JWT
- **Usuários**: Perfil do usuário logado
- **Academias**: Criação (ADMIN), busca por nome, academias próximas
- **Check-ins**: Realização, validação (ADMIN), histórico e métricas

## Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## Começando

### Pré-requisitos

![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat&logo=docker&logoColor=white)

### Instalação

1. **Clone o repositório:**

   ```sh
   git clone <url-do-repositorio>
   cd api-solid
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure o ambiente:**

   ```sh
   cp .env.example .env
   # Edite .env com suas configurações
   ```

4. **Inicie o banco de dados:**

   ```sh
   docker-compose up -d
   ```

5. **Execute as migrações do Prisma:**

   ```sh
   npx prisma migrate dev
   ```

6. **Gere o cliente Prisma:**

   ```sh
   npx prisma generate
   ```

7. **Inicie o servidor em modo desenvolvimento:**
   ```sh
   npm run start:dev
   ```

A API estará disponível em `http://localhost:3333`.

## Rodando os Testes

### Comandos Disponíveis

- **Testes unitários:**

  ```sh
  npm run test:unit
  ```

- **Testes end-to-end:**

  ```sh
  npm run test:e2e
  ```

- **Todos os testes:**

  ```sh
  npm test
  ```

- **Testes em modo watch (desenvolvimento):**

  ```sh
  npm run test:watch:unit  # Unitários
  npm run test:watch:e2e   # E2E
  ```

- **Cobertura de testes:**

  ```sh
  npm run test:coverage
  ```

- **Interface visual dos testes:**
  ```sh
  npm run test:ui
  ```

## Documentação da API

A documentação interativa está disponível via Swagger UI em `http://localhost:3333/docs`.

### Principais Grupos de Rotas

- **Users**: Registro, perfil e autenticação
- **Gyms**: Gerenciamento de academias (busca, criação)
- **Check-ins**: Sistema de check-ins (realização, validação, histórico)
- **Authentication**: Refresh de tokens

Para gerar/atualizar a documentação automaticamente:

```sh
npm run start:dev  # A documentação é gerada dinamicamente
```

## Estrutura do Projeto

```
src/
├── app.ts                 # Configuração principal do Fastify
├── server.ts              # Ponto de entrada da aplicação
├── env/                   # Configurações de ambiente
├── http/
│   ├── controllers/       # Controllers HTTP
│   │   ├── users/
│   │   ├── gyms/
│   │   └── check-ins/
│   ├── middlewares/       # Middlewares customizados
│   └── schemas/           # Schemas Zod para validação
├── use-cases/             # Casos de uso (regras de negócio)
├── repositories/          # Interfaces e implementações de repositório
├── utils/                 # Utilitários diversos
└── @types/                # Definições de tipos customizados

prisma/
├── schema.prisma          # Schema do banco de dados
└── migrations/            # Migrações do banco

generated/                 # Cliente Prisma gerado
lib/                       # Configurações do Prisma
```

## Conceitos Técnicos

### SOLID Principles

- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Open/Closed**: Código aberto para extensão, fechado para modificação
- **Liskov Substitution**: Subtipos podem substituir seus tipos base
- **Interface Segregation**: Interfaces específicas ao invés de genéricas
- **Dependency Inversion**: Dependências de abstrações, não de concretizações

### Clean Architecture

O projeto segue a Clean Architecture com camadas bem definidas:

- **Controllers**: Recebem requisições HTTP, validam entrada
- **Use Cases**: Contêm regras de negócio puras
- **Repositories**: Abstraem acesso a dados

### Exemplo: Criação de Usuário

```typescript
// Controller (HTTP)
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = request.body
  const registerUseCase = makeRegisterUseCase()
  await registerUseCase.execute({ name, email, password })
  return reply.status(201).send()
}

// Use Case (Regras de negócio)
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // Validações de negócio
    // Hash da senha
    // Persistência
  }
}

// Repository (Acesso a dados)
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }
}
```

### Type Safety com Zod

Validação de entrada e saída usando schemas Zod:

```typescript
export const createUserBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})
```

### Autenticação JWT

- Access tokens: Curta duração (10 minutos)
- Refresh tokens: Longa duração (7 dias), armazenados em cookies HTTP-only
- Middleware de verificação de JWT em rotas protegidas

## Licença

Este projeto está sob a licença MIT.
