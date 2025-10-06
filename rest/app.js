import express from "express";
import swaggerUi from "swagger-ui-express";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { openapi } from "./swagger.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();
app.use(express.json());

app.use("/", usuariosRoutes);
app.use("/", checkoutRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

export default app;
