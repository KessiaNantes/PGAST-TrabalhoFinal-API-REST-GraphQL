import jwt from "jsonwebtoken";
import { CheckoutService } from "../src/services/checkoutServices.js";
import { UsuariosServices } from "../src/services/usuariosServices.js";

const JWT_SECRET = process.env.JWT_SECRET || "segredo-super-seguro";

export const resolvers = {
  Query: {
    produtos: (_, __, ctx) => {
      if (!ctx.usuario) throw new Error("Não autorizado");
      return CheckoutService.listarProdutos();
    },
    me: (_, __, ctx) => {
      if (!ctx.usuario) return null;
      return UsuariosServices.listar().find(u => u.id === ctx.usuario.sub) || null;
    }
  },
  Mutation: {
    cadastroUsuario: (_, { dados }) => {
      const novo = UsuariosServices.criar(dados);
      return { id: novo.id, nome: novo.nome, email: novo.email };
    },
    login: (_, { dados }) => {
      const usuario = UsuariosServices.buscarPorEmail(dados.email);
      if (!usuario || usuario.senha !== dados.senha) {
        throw new Error("Credenciais inválidas");
      }
      const token = jwt.sign(
        { sub: usuario.id, email: usuario.email, nome: usuario.nome },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
    }
  }
};
