import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Usuario {
    id: ID!
    nome: String!
    email: String!
  }

  type Produto {
    id: ID!
    nome: String!
    preco: Int!
  }

  type AuthPayload {
    token: String!
    usuario: Usuario!
  }

  type Query {
    produtos: [Produto!]!
    me: Usuario
  }

  input CadastroUsuarioInput {
    nome: String!
    email: String!
    senha: String!
  }

  input LoginInput {
    email: String!
    senha: String!
  }

  type Mutation {
    cadastroUsuario(dados: CadastroUsuarioInput!): Usuario!
    login(dados: LoginInput!): AuthPayload!
  }
`;
