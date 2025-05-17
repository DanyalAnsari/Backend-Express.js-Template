import createError from 'http-errors';

class AppError extends Error {
	constructor(statusCode, message) {
		const err = createError(statusCode, message);
		super(err.message);

		this.statusCode = err.status;
		this.name = err.name;
		this.expose = err.expose;
		this.stack = err.stack;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
