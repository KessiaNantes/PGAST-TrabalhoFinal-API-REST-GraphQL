import { expect } from "chai";
import request from "supertest";
import app from "../../../rest/app.js";

describe("[REST][External] Autenticação", () => {
  it("POST /login -> 400 quando faltar campos", async () => {
    const res = await request(app).post("/login").send({});
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("erro");
  });

  it("POST /login -> 200 com seed e retorna token", async () => {
    const res = await request(app).post("/login").send({
      email: "ana@exemplo.com",
      senha: "senha123"
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("usuario");
  });

  it("POST /cadastro-usuario -> 201 cria usuário", async () => {
    const res = await request(app).post("/cadastro-usuario").send({
      nome: "Novo",
      email: "novo@exemplo.com",
      senha: "123"
    });
    expect(res.status).to.equal(201);
    expect(res.body.usuario).to.include({ nome: "Novo", email: "novo@exemplo.com" });
  });

  it("POST /cadastro-usuario -> 400 e-mail duplicado", async () => {
    const res = await request(app).post("/cadastro-usuario").send({
      nome: "Dup",
      email: "ana@exemplo.com",
      senha: "123"
    });
    expect(res.status).to.equal(400);
    expect(res.body.erro).to.match(/E-mail já cadastrado/i);
  });
});
