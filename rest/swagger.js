export const openapi = {
  openapi: "3.0.0",
  info: {
    title: "pgats - trabalho final API",
    version: "1.0.0",
    description: "Autenticação (JWT Bearer) e listagem de produtos protegida."
  },
  servers: [{ url: "http://localhost:3023" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    },
    schemas: {
      LoginInput: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", example: "ana@exemplo.com" },
          senha: { type: "string", example: "senha123" }
        }
      },
      CadastroInput: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Novo Usuário" },
          email: { type: "string", example: "novo@exemplo.com" },
          senha: { type: "string", example: "minhasenha" }
        }
      }
    }
  },
  paths: {
    "/cadastro-usuario": {
      post: {
        summary: "Cadastro de usuário",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CadastroInput" } } }
        },
        responses: { "201": { description: "Criado" }, "400": { description: "Erro de validação" } }
      }
    },
    "/login": {
      post: {
        summary: "Login",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginInput" } } }
        },
        responses: {
          "200": { description: "OK (retorna token)" },
          "400": { description: "Parâmetros ausentes" },
          "401": { description: "Credenciais inválidas" }
        }
      }
    },
    "/produtos": {
      get: {
        summary: "Lista de produtos (protegido)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" }, "401": { description: "Não autorizado" } }
      }
    }
  }
};
