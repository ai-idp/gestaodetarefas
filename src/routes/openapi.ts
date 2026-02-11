import { Router, Request, Response } from "express";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (_req: Request, res: Response) => {
  try {
    // Em runtime (dist/routes/openapi.js), swagger.json esta em dist/swagger.json
    // ou seja, um nivel acima: ../swagger.json
    const specPath = join(__dirname, "..", "swagger.json");
    const content = await readFile(specPath, "utf-8");
    res.type("application/json").send(content);
  } catch {
    res.status(503).json({ error: "OpenAPI spec not generated. Run: npm run openapi:generate" });
  }
});

export default router;
