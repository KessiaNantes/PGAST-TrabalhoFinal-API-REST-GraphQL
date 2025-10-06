import { usuarios } from "../models/usuarios.js";

export class UsuariosServices {
  static listar() {
    return usuarios;
  }

  static buscarPorEmail(email) {
    return usuarios.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  }

  static criar({ nome, email, senha }) {
    if (!nome || !email || !senha) {
      const erro = new Error("nome, email e senha são obrigatórios");
      erro.status = 400;
      throw erro;
    }
    const existente = this.buscarPorEmail(email);
    if (existente) {
      const erro = new Error("E-mail já cadastrado");
      erro.status = 400;
      throw erro;
    }
    const novo = {
      id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
      nome,
      email,
      senha
    };
    usuarios.push(novo);
    return novo;
  }
}
