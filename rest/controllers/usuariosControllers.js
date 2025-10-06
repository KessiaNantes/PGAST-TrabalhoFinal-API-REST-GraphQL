import jwt from "jsonwebtoken";
import { UsuariosServices } from "../../src/services/usuariosServices.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

export class UsuariosControllers {
  static async cadastroUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body || {};
      const novo = UsuariosServices.criar({ nome, email, senha });
      return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novo });
    } catch (e) {
      const status = e.status || 400;
      return res.status(status).json({ erro: e.message || "Erro no cadastro" });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body || {};
      if (!email || !senha) {
        return res.status(400).json({ erro: "email e senha são obrigatórios" });
      }
      const usuario = UsuariosServices.buscarPorEmail(email);
      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }
      const token = jwt.sign(
        { sub: usuario.id, email: usuario.email, nome: usuario.nome },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
      });
    } catch {
      return res.status(401).json({ erro: "Não autorizado" });
    }
  }
}
