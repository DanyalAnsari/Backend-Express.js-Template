import logger from "#services/logger";
import createHttpError from "http-errors";



function globalErrorHandler(err, req, res, next) {
	if (!createHttpError.isHttpError(err)) {
		logger.error(`[UNKNOWN] ${err.stack || err}`);
		err = createError(500, "Internal Server Error");
	} else {
		logger.error(`[${err.status}] ${err.message}`);
	}

	res.status(err.status).json({
		success: false,
		message: err.expose ? err.message : "Something went wrong",
		error: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
}

export default globalErrorHandler;

// This middleware handles errors globally in the application.
