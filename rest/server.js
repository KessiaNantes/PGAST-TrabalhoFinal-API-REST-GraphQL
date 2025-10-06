import app from "./app.js";

const PORT = process.env.REST_PORT || 3023;

app.listen(PORT, () => {
  console.log(`[REST] Servidor rodando na porta ${PORT}`);
  console.log(`[REST] Swagger: http://localhost:${PORT}/api-docs`);
});
