import { createApolloApp } from "./app.js";

const PORT = process.env.GRAPHQL_PORT || 4013;

const start = async () => {
  const app = await createApolloApp();
  app.listen(PORT, () => {
    console.log(`[GraphQL] Servidor rodando na porta ${PORT} em /graphql`);
  });
};

start();
