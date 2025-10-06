import { expect } from "chai";
import request from "supertest";
import app from "../../../rest/app.js";

async function obterToken() {
  const r = await request(app).post("/login").send({
    email: "ana@exemplo.com",
    senha: "senha123"
  });
  return r.body.token;
}

describe("[REST][External] Produtos", () => {
  it("GET /produtos -> 401 sem token", async () => {
    const res = await request(app).get("/produtos");
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("erro");
  });

  it("GET /produtos -> 200 com Bearer e lista", async () => {
    const token = await obterToken();
    const res = await request(app).get("/produtos").set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.produtos).to.be.an("array").with.length.greaterThan(0);
  });
});
