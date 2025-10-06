import express from "express";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

export async function createApolloApp() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const authorization = req.headers.authorization || "";
      const [tipo, token] = authorization.split(" ");
      if (tipo === "Bearer" && token) {
        try {
          const payload = jwt.verify(token, JWT_SECRET);
          return { usuario: payload };
        } catch {
          return { usuario: null };
        }
      }
      return { usuario: null };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  return app;
}
