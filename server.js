import logger from "#services/logger";
import app from "#root/app";
const initializeServer = (app) => {
	const PORT = process.env.PORT;
	const NODE_ENV = process.env.NODE_ENV;
	try {
		// Start server
		const server = app.listen(PORT, () => {
			logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
		});

		// Handle unhandled promise rejections
		process.on("unhandledRejection", (err) => {
			logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
			logger.error(err.name, err.message);
			logger.error(err.stack);

			gracefulShutdown(server);
		});

		// Handle uncaught exceptions
		process.on("uncaughtException", (err) => {
			logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
			logger.error(err.name, err.message);
			logger.error(err.stack);

			gracefulShutdown(server);
		});

		// Handle SIGTERM
		process.on("SIGTERM", () => {
			logger.info("SIGTERM received. Shutting down gracefully");
			gracefulShutdown(server);
		});

		// Handle SIGINT
		process.on("SIGINT", () => {
			logger.info("SIGINT received. Shutting down gracefully");
			gracefulShutdown(server);
		});
	} catch (error) {
		logger.error("Failed to start server:", error);
		process.exit(1);
	}
};

// Graceful shutdown function
async function gracefulShutdown(server) {
	try {
		await server.close();
		logger.info("Server closed");

		await DB.close();
		logger.info("Database connection closed");

		process.exit(0);
	} catch (error) {
		logger.error("Error during graceful shutdown:", error);
		process.exit(1);
	}
}

initializeServer(app);
