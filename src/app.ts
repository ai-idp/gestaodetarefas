import express from "express";
import { RegisterRoutes } from "./routes.js";
import openapiRoutes from "./routes/openapi.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tsoa auto-generated routes (includes /health from controllers)
RegisterRoutes(app);

// Manual routes
app.use("/openapi", openapiRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
