import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";

import { CheckoutControllers } from "../../../rest/controllers/checkoutControllers.js";
import * as CheckoutServicesMod from "../../../src/services/checkoutServices.js";

describe("[REST][Controller] CheckoutControllers (Produtos)", () => {
  afterEach(() => sinon.restore());

  it("produtos -> 401 quando Authorization ausente", async () => {
    const req = { headers: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await CheckoutControllers.produtos(req, res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.firstCall.args[0]).to.have.property("erro");
  });

  it("produtos -> 200 e array com token válido", async () => {
    const req = { headers: { authorization: "Bearer teste" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    sinon.stub(jwt, "verify").returns({ sub: 1, email: "a@a.com" });
    sinon
      .stub(CheckoutServicesMod.CheckoutServices || CheckoutServicesMod.CheckoutService || CheckoutServicesMod, "listarProdutos")
      .returns([{ id: 1, nome: "x", preco: 10 }]);

    await CheckoutControllers.produtos(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.firstCall.args[0].produtos).to.be.an("array");
  });
});
