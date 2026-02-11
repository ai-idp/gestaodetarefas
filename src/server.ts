import app from "./app.js";
import { createServer } from "http";

const PRIMARY_PORT = Number(process.env.PORT) || 8080;
const FALLBACK_PORT = 3001;
const HOST = "0.0.0.0";

function startServer(port: number, isFallback = false): void {
  const server = createServer(app);

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE" && !isFallback) {
      console.warn(`[gestaodetarefas] Port ${port} in use, trying ${FALLBACK_PORT}`);
      startServer(FALLBACK_PORT, true);
    } else {
      console.error(`[gestaodetarefas] Failed to start:`, err.message);
      process.exit(1);
    }
  });

  server.listen(port, HOST, () => {
    console.log(`[gestaodetarefas] Running on http://${HOST}:${port}`);
  });
}

startServer(PRIMARY_PORT);
