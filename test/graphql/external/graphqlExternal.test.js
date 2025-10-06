import { expect } from "chai";
import request from "supertest";
import { createApolloApp } from "../../../graphql/app.js";

let app;
before(async () => {
  app = await createApolloApp();
});

describe("[GraphQL][External]", () => {
  it("cadastroUsuario cria usuário (mutation)", async () => {
    const mutation = `
      mutation($dados: CadastroUsuarioInput!) {
        cadastroUsuario(dados: $dados) { id nome email }
      }
    `;
    const variables = { dados: { nome: "GUser", email: "guser@exemplo.com", senha: "123" } };

    const res = await request(app).post("/graphql").send({ query: mutation, variables });
    expect(res.status).to.equal(200);
    expect(res.body.data.cadastroUsuario.email).to.equal("guser@exemplo.com");
  });

  it("login retorna token e permite consultar produtos (query protegida)", async () => {
    const loginMutation = `
      mutation($dados: LoginInput!) {
        login(dados: $dados) { token usuario { id email } }
      }
    `;
    const loginVars = { dados: { email: "ana@exemplo.com", senha: "senha123" } };
    const loginRes = await request(app).post("/graphql").send({ query: loginMutation, variables: loginVars });
    const token = loginRes.body.data.login.token;
    expect(token).to.be.a("string");

    const produtosQuery = `{ produtos { id nome preco } }`;
    const resProdutos = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query: produtosQuery });

    expect(resProdutos.status).to.equal(200);
    expect(resProdutos.body.data.produtos).to.be.an("array").with.length.greaterThan(0);
  });

  it("produtos sem token retorna errors[] e data:null", async () => {
    const res = await request(app).post("/graphql").send({ query: `{ produtos { id } }` });
    expect(res.status).to.equal(200);
    expect(res.body.errors).to.be.an("array");
    expect(res.body.data).to.be.null;
  });
});
