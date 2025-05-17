import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from 'xss-clean'; // optional

const appSecurity = (app) => {
	// Disable the `X-Powered-By` header which could give away information about the framework and its version.
	app.disable("x-powered-by");

	// Helmet helps protect against common web exploits
	app.use(helmet());

	// Optional Content Security Policy
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				imgSrc: ["'self'", "data:"],
			},
		})
	);

	// CORS with whitelist
	// Split the CORS_ORIGIN environment variable into an array and also include the frontend URL
	const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
		"http://localhost:3000",
		process.env.FRONTEND_URL.trim(),
	];

	// Use CORS middleware

	app.use(
		cors({
			origin: (origin, callback) => {
				// If the origin is in the whitelist, allow it
				if (!origin || allowedOrigins.includes(origin)) {
					return callback(null, true);
				}
				callback(new Error("Not allowed by CORS"));
			},
			// Allow credentials (cookies) to be sent with requests
			credentials: true,
		})
	);

	// Rate limiting middleware
	app.use(
		rateLimit({
			// Set the time window to 15 minutes
			windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
			// Set the maximum number of requests to 100
			max: process.env.RATE_LIMIT_MAX || 100,
			// Set the headers to be returned with the rate limit
			standardHeaders: true,
			legacyHeaders: false,
		})
	);

	// HPP middleware
	app.use(hpp());

	// MongoDB Sanitize middleware
	app.use(mongoSanitize());

	// XSS protection middleware (optional)
	app.use(xss());
};

export default appSecurity;
