import { Router } from "express";
import { UsuariosControllers } from "../../rest/controllers/usuariosControllers.js";

const usuariosRoutes = Router();

usuariosRoutes.post("/cadastro-usuario", UsuariosControllers.cadastroUsuario);
usuariosRoutes.post("/login", UsuariosControllers.login);

export default usuariosRoutes;
