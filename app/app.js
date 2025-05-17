import express from "express";
import { configDotenv } from "dotenv";
configDotenv({ path: "./config/development.env" });
import createHttpError from "http-errors";


import globalErrorHandler from "#middlewares/GlobalErrorHandler";
import appMiddlewares from "#app/middlewares/appMiddlewares";
import appSecurity from "#app/security/AppSecurity";
import router from "#routes/Router";

const app = express();

// Middleware
appMiddlewares(app);

// App configuration and security middleware
appSecurity(app);

// Health check endpoints
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

// Mount all routes
app.use("/api", router);

app.use((req, res, next) => {
	next(createHttpError(404, "Route not found"));
});

// Global error handler middleware
app.use(globalErrorHandler);

export default app;
