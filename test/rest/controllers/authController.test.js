import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";

import { UsuariosControllers } from "../../../rest/controllers/usuariosControllers.js";
import { UsuariosServices } from "../../../src/services/usuariosServices.js";

describe("[REST][Controller] UsuariosControllers (Auth)", () => {
  afterEach(() => sinon.restore());

  it("cadastroUsuario -> 201 quando criar com sucesso", async () => {
    const req = { body: { nome: "X", email: "x@x.com", senha: "123" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    const stubCriar = sinon.stub(UsuariosServices, "criar")
      .returns({ id: 99, nome: "X", email: "x@x.com", senha: "123" });

    await UsuariosControllers.cadastroUsuario(req, res);
    expect(stubCriar.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.firstCall.args[0].usuario).to.include({ id: 99, email: "x@x.com" });
  });

  it("login -> 400 quando faltar campos", async () => {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await UsuariosControllers.login(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.firstCall.args[0]).to.have.property("erro");
  });

  it("login -> 200 com token quando credenciais válidas", async () => {
    const req = { body: { email: "a@a.com", senha: "1" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(UsuariosServices, "buscarPorEmail")
      .returns({ id: 1, nome: "A", email: "a@a.com", senha: "1" });
    sinon.stub(jwt, "sign").returns("token-falso");

    await UsuariosControllers.login(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.firstCall.args[0]).to.include({ token: "token-falso" });
  });

  it("login -> 401 quando credenciais inválidas", async () => {
    const req = { body: { email: "a@a.com", senha: "errada" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(UsuariosServices, "buscarPorEmail")
      .returns({ id: 1, nome: "A", email: "a@a.com", senha: "1" });

    await UsuariosControllers.login(req, res);
    expect(res.status.calledWith(401)).to.be.true;
  });
});
