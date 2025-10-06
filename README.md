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
