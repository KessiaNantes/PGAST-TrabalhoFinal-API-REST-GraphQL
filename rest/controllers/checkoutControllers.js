import jwt from "jsonwebtoken";
import { CheckoutService } from "../../src/services/checkoutServices.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

export class CheckoutControllers {
  static async produtos(req, res) {
    try {
      const authorization = req.headers.authorization || "";
      const [tipo, token] = authorization.split(" ");
      if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Não autorizado!" });
      }
      try {
        jwt.verify(token, JWT_SECRET);
      } catch {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
      }

      const itens = CheckoutService.listarProdutos();
      return res.status(200).json({ produtos: itens });
    } catch (e) {
      const status = e.status || 400;
      return res.status(status).json({ erro: e.message || "Erro ao listar produtos" });
    }
  }
}
