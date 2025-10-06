PGATS – Trabalho Final API (REST + GraphQL)

API em Node.js 20 (ESM) com Express (REST) e Apollo (GraphQL).
Autenticação JWT (Bearer), documentação Swagger, e testes automatizados com Mocha + Chai + Supertest (External) e Sinon (Controllers).
CI no GitHub Actions (push/PR) + agendado às segundas 12:00 BRT.


✅ Stack

Express, Apollo Server v3, GraphQL v16
JWT (jsonwebtoken), Swagger (swagger-ui-express)
Mocha, Chai, Supertest, Sinon


Instalação

npm install


Executar REST (3023)

npm run start:rest
# Swagger: http://localhost:3023/api-docs


Executar GraphQL (4013)

npm run start:graphql
# http://localhost:4013/graphql


Rotas REST

POST /cadastro-usuario { nome, email, senha }

POST /login { email, senha } → { token, usuario }

GET /produtos (protegida, header Authorization: Bearer <token>)

GET /api-docs

Seeds

Users: ana@exemplo.com/senha123, bruno@exemplo.com/123456, carlos@exemplo.com/abc123

Products: abajur, luminária, mesa, cadeira, aparador
