import express from "express";
import compression from "compression";
import morgan from "morgan";
const appMiddlewares = (app) => {
	// Middleware for parsing JSON bodies
	app.use(express.json({limit: "10kb"}));

	// Middleware for parsing URL-encoded bodies
	app.use(express.urlencoded({ extended: true, limit: "10kb" }));

	// Middleware for serving static files
	app.use(express.static("public"));

	// Compression
	app.use(compression());

	// Logging
	if (process.env.NODE_ENV === "development") {
		app.use(morgan("combined"));
	}
};

export default appMiddlewares;
